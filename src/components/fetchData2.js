import { trafficRegPoints, trafficRegPointsQuery, trafficData, queryCounty } from "./queries.js";
// because early node version in Docker dev environment, i must install node-fetch and import fetch. Just uncomment to use with later node version.
import fetch from "node-fetch";
import { jsonToCsv } from "./jsonToCsv.js";
import filterTrafficPoints from "./filterTrafficPoints.js";
import { RegpointDataCsv } from "./regpointDataCsv.js";

// This is jus a part of testing. Change in index.js to use.

const FetchData2 = (cmdInput) => {

  console.log({cmdInput});

  let querySwitch = null;
  

  
  const fetchApi = async (item) => {
    let data = null;

    const httpOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          query: item,
        }),
      };

      
    try {
      const res= await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
      data = await res.json()
    //   console.log(httpOptions);
    //   console.log({data});
    // console.log(JSON.stringify(data, null, 4));
    //   return data;

    //   switch (cmdInput[2]){
    //     case '-s':
    //       jsonToCsv(data)
    //       break;

    //     case '-id':
    //       RegpointDataCsv(data)
    //       break;

    //     case '-all':
    //       break;

    //     default:
    //       filterTrafficPoints(cmdInput[2], cmdInput[3], data);
    //       break; 
    //   }

      // if using a query on graphQL, send direct to csv parser. Else use filter module
      // if (cmdInput[2] === '-s' || cmdInput[2] === '-id' || cmdInput[2] === '-all'){
      //   console.log('Data to CSV module: ', data);
      //   // console.log(JSON.stringify(data, null, 4));

      //   // PS: only '-s' is functional thru jsonToCsv at the moment
      //   // jsonToCsv(data)
      // }
      // else {
      //   filterTrafficPoints(cmdInput[2], cmdInput[3], data);
      // }
    }
    catch  (err){console.log(err);}

    console.log(JSON.stringify(data, null, 4));
    return data
  };

  // selects graphQL options based on cmd input
  switch (cmdInput[2]) {
    // list county reg.points
    case '-c':
      // querySwitch = queryCounty;
      querySwitch = trafficRegPoints;
      console.log({querySwitch});
      break;

    // list municipality reg.points
    case '-m':
      querySwitch = trafficRegPoints;
      break;
      
    // search reg.points by name or number
    case '-s':
      querySwitch = `{trafficRegistrationPoints(searchQuery: {query: "${cmdInput[3]}"})` + trafficRegPointsQuery;
      break;

    // select specific reg.point
    case '-id':
      querySwitch = `{trafficData(trafficRegistrationPointId: "${cmdInput[3]}")` + trafficData;
      RegpointDataCsv(fetchApi(querySwitch))
    // console.log(fetchApi(querySwitch).then((res) => console.log(res)));
    // console.log(JSON.stringify(fetchApi(querySwitch), null, 4));
      break;

    // list all reg.points
    case '-all':
      querySwitch = trafficRegPoints;
      break;

    // stops further execution of program
    default: 
      console.log("Check your input. You typed:", cmdInput[2], cmdInput[3]);
      return;
  }

  // fetchApi();
  
};

export {FetchData2}