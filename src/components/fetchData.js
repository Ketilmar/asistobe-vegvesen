import { trafficRegPoints, trafficData, queryCounty } from "./queries.js";
// because early node version in Docker dev environment, i must install node-fetch and import fetch. Just uncomment to use with later node version.
import fetch from "node-fetch";
import { jsonToCsv } from "./jsonToCsv.js";


const FetchData = (cmdInput) => {

  let querySwitch = null;

  switch (cmdInput[0]) {
    case 'county':
      querySwitch = queryCounty;
      console.log({querySwitch});
      break;

    case 'municipality':
      querySwitch = `{trafficRegistrationPoints(searchQuery: {query: "${cmdInput[1]}"})` + trafficRegPoints;
      break;

    case 'trafficdata':
      querySwitch = `{trafficData(trafficRegistrationPointId: "${cmdInput[1]}")` + trafficData;
      break;

    default: 
      console.log('TEST: switch default');
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
      const res= await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
      let data = await res.json()

      // console.log(JSON.stringify(data, null, 4) );
      jsonToCsv(data)
      
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