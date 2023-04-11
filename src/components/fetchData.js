import { trafficRegPoints, trafficRegPointsQuery, queryCounty, queryMunicipality, trafficVolumeByLength } from "./queries.js";
// because early node version in Docker dev environment, i must install node-fetch and import fetch. Just uncomment to use with later node version.
import fetch from "node-fetch";
import { SearchResultCsv } from "./searchResultCsv.js";
import {filterTrafficPoints} from "./filterTrafficPoints.js";
import { csvConstructor } from "./csvConstructor.js";


/** Fetches the data and sends it to the various parsers */
const fetchApi = async (cmdSwitch, querySwitch, id, fromDate, toDate, path) => {

  const httpOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      query: querySwitch,
    }),
  };

  try {
    const res= await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
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
          FetchData(cmdSwitch, id, fromDate, toDate, hasNextPage.endCursor, path)
        };
        
        break;

      default:
        filterTrafficPoints(cmdSwitch, id, fromDate, toDate, data, path);
        break; 
    }

  }
  catch  (err){
    console.log(`Error ID: ${id}. Error name: ${err.name} - Error code: ${err.code}`);
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
      querySwitch = trafficVolumeByLength(id, fromDate, toDate, endCursor);
      break;

    case '-all':
      querySwitch = trafficRegPoints;
      break;

    default: 
      console.log("Check your input. You typed:", cmdSwitch, id, fromDate, toDate, path);
      return;
  }

  return fetchApi(cmdSwitch, querySwitch, id, fromDate, toDate, path);
  
};

export {FetchData, fetchApi}