import { trafficRegPoints, trafficRegPointsQuery, trafficData, queryCounty } from "./queries.js";
// because early node version in Docker dev environment, i must install node-fetch and import fetch. Just uncomment to use with later node version.
import fetch from "node-fetch";
import { jsonToCsv } from "./jsonToCsv.js";
import filterTrafficPoints from "./filterTrafficPoints.js";


const FetchData = (cmdInput) => {

  console.log({cmdInput});

  let querySwitch = null;

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
      break;

    // list all reg.points
    case '-all':
      querySwitch = trafficRegPoints;
      break;

    default: 
      console.log('Please check your input');
      break;


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

      // console.log(JSON.stringify(data, null, 4) );
      
      // if using a query on graphQL, send direct to csv parser. Else use filter module
      if (cmdInput[2] === '-s' || cmdInput[2] === '-id' || cmdInput[2] === '-all'){
        console.log(data);
        // jsonToCsv(data)
      }
      else {
        filterTrafficPoints(cmdInput[2], cmdInput[3], data);
      }
    }
    catch  (err){console.log(err);}
      
       // .then((res) => res.json())
      // // .then((res) => setData(res))
      // .then(res => {data = res})
      // // .then((res) => console.log(res))
      // .catch((err) => console.log(err))
      // .finally()
  };

  fetchApi()

  
  
};

export {FetchData}