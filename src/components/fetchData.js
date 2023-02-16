import { trafficRegPoints, trafficRegPointsQuery, queryCounty, queryMunicipality, trafficVolumeByLength } from "./queries.js";
// because early node version in Docker dev environment, i must install node-fetch and import fetch. Just uncomment to use with later node version.
import fetch from "node-fetch";
import { SearchResultCsv } from "./searchResultCsv.js";
import filterTrafficPoints from "./filterTrafficPoints.js";
// import {fromDateDefault, toDateDefault} from "./getDefaultDates.js"
import { TrafficVolumeByLengthCsv } from "./trafficVolumeByLengthCsv.js";

// const cmdSwitch = process.argv[2]
// const id = process.argv[3]
// const fromDate = process.argv[4] || fromDateDefault;
// const toDate = process.argv[5] || toDateDefault;
// const path = process.argv[process.argv.length] || "trafficVolumeByLength.csv";

const FetchData = (cmdSwitch, id, fromDate, toDate, path) => {
  let querySwitch = null;

  // selects graphQL options based on cmd input
  switch (cmdSwitch) {
    // list county reg.points
    case '-c':
      // querySwitch = queryCounty;
      querySwitch = trafficRegPoints;
      break;

      case '-clist':
      querySwitch = queryCounty;
      break;

    // list municipality reg.points
    case '-m':
      querySwitch = trafficRegPoints;
      break;

    case '-mlist':
      querySwitch = queryMunicipality;
      break;
      
    // search reg.points by name or number
    case '-s':
      querySwitch = `{trafficRegistrationPoints(searchQuery: {query: "${id}"})` + trafficRegPointsQuery;
      break;

    // select specific reg.point
    case '-id':
      querySwitch = trafficVolumeByLength(id, fromDate, toDate);
      break;

    // list all reg.points
    case '-all':
      querySwitch = trafficRegPoints;
      break;

    // stops further execution of program
    default: 
      console.log("Check your input. You typed:", cmdSwitch, id, fromDate, toDate, path);
      return;
  }


  const httpOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      query: querySwitch,
    }),
  };

  
  const fetchApi = async () => {
    try {
      const res= await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
      let data = await res.json()
      

      // Send fetch return to the various parsers
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
          filterTrafficPoints(cmdSwitch, id, fromDate, toDate, path, data);
          break; 
      }

    }
    catch  (err){console.log(err);}

  };

  fetchApi();
  
};

export {FetchData}