import { trafficRegPoints, trafficRegPointsQuery, queryCounty, queryMunicipality, trafficVolumeByLength } from "./queries.js";
// because early node version in Docker dev environment, i must install node-fetch and import fetch. Just uncomment to use with later node version.
import fetch from "node-fetch";
import fetchRetry from 'fetch-retry';

import { SearchResultCsv } from "./searchResultCsv.js";
import {filterTrafficPoints} from "./filterTrafficPoints.js";
import { csvConstructor } from "./csvConstructor.js";
import { getTimezones } from "./getTimezone.js";

const inputCheck = (fromDate, toDate) => {
  const regEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  if (regEx.test(fromDate) && regEx.test(toDate)) {
    console.log("Passed")
    return true
  } else {
    console.log("Passed in wrong date format")
    return false
  }
}
const fetchWithRetry = fetchRetry(fetch)

/** Fetches the data and sends it to the various parsers */
const fetchApi = async (cmdSwitch, querySwitch, id, fromDate, toDate, endCursor, path) => {

  const httpOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    retries: 3,
    retryDelay: 1000,
    retryOn: function(attempt, error, response) {
      // retry on any network error, or 4xx or 5xx status codes
      if (error !== null || response.status >= 400) {
        console.log(`retrying, attempt number ${attempt + 1} - ID: ${id} EndCursor: ${endCursor}`);
        return true;
      }
    },
    body: JSON.stringify({
      query: querySwitch,
    }),
  };

  try {
    const res= await fetchWithRetry("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
    const data = await res.json()
    
    switch (cmdSwitch){
      case '-s':
        SearchResultCsv(data, path);
        break;
        
      case '-clist':
        // console.log(JSON.stringify(data, null, 4))
        console.log(data.data.areas.counties.map(county => county));
        break;

      case '-mlist':
        console.log(data.data.areas.municipalities.map(municipality => municipality));
        break;

      case '-id':
        csvConstructor(data, path);

        // if timespan is longer than 5 days, pagination is used to get consecutive data.
        const hasNextPage = data.data.trafficData.volume.byHour.pageInfo; 
        if (hasNextPage.hasNextPage === true){
          FetchData(cmdSwitch, id, fromDate, toDate, hasNextPage.endCursor, path);
        };
        
        break;

      default:
        filterTrafficPoints(cmdSwitch, id, fromDate, toDate, data, path);
        break; 
    }

  }
  catch  (err){
    console.log(`Error ID: ${id}. Error name: ${err.name} - Error code: ${err.code} - EndCursor: ${endCursor}`)
  };

};

/** selects graphQL query based on cmd input and sends it to fetchApi */
const FetchData = (cmdSwitch, id, fromDate, toDate, endCursor, path) => {
  
  let querySwitch = null;

  switch (cmdSwitch) {
    
    case '-c':
      querySwitch = trafficRegPoints;
      break;

    case '-clist':
      querySwitch = queryCounty;
      break;

    case '-m':
      querySwitch = trafficRegPoints;
      break;

    case '-mlist':
      querySwitch = queryMunicipality;
      break;
      
    case '-s':
      querySwitch = `{trafficRegistrationPoints(searchQuery: {query: "${id}"})` + trafficRegPointsQuery;
      break;

    case '-id':
      let dateTime = getTimezones(fromDate, toDate)
      querySwitch = trafficVolumeByLength(id, dateTime[0], dateTime[1], endCursor);
      break;

    case '-all':
      querySwitch = trafficRegPoints;
      break;

    default: 
      console.log("Check your input. You typed:", cmdSwitch, id, fromDate, toDate, path);
      return;
  }

  return fetchApi(cmdSwitch, querySwitch, id, fromDate, toDate, endCursor, path);
  
};

export {FetchData, fetchApi, inputCheck}