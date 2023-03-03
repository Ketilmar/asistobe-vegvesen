import { trafficRegPoints, trafficRegPointsQuery, queryCounty, queryMunicipality, trafficVolumeByLength } from "./queries.js";
// because early node version in Docker dev environment, i must install node-fetch and import fetch. Just uncomment to use with later node version.
import fetch from "node-fetch";
import { SearchResultCsv } from "./searchResultCsv.js";
import {filterTrafficPoints} from "./filterTrafficPoints.js";
import { TrafficVolumeByLengthCsv } from "./trafficVolumeByLengthCsv.js";


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
        TrafficVolumeByLengthCsv(data, path);
        break;

      default:
        filterTrafficPoints(cmdSwitch, id, fromDate, toDate, data, path);
        break; 
    }
    return data;

  }
  // catch  (err){console.log(err);}
    catch (err){return null}

  // return data.trafficRegPoints;

};

/** selects graphQL query based on cmd input and sends it to fetchApi */
const FetchData = (cmdSwitch, id, fromDate, toDate, path, jestCallback = () => {}) => {
  
  let querySwitch = null;

  switch (cmdSwitch) {
    
    case '-c':
      querySwitch = trafficRegPoints;
      jestCallback(querySwitch);
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
      querySwitch = trafficVolumeByLength(id, fromDate, toDate);
      break;

    case '-all':
      querySwitch = trafficRegPoints;
      break;

    default: 
      console.log("Check your input. You typed:", cmdSwitch, id, fromDate, toDate, path);
      return;
  }

  fetchApi(cmdSwitch, querySwitch, id, fromDate, toDate, path);
  
};


import { execSync } from "node:child_process";

const jestTest = (cmd) => {
  // export default (cmd) => {
  const result = execSync(cmd);
  // const result = console.log('dette er fetch');
  // const result = 'TEST RESULT';
  console.log("in index, execSync returns", result);
  return result;
};

export {FetchData, fetchApi, jestTest}