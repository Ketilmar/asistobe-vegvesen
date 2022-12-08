import { trafficRegPoints, trafficData, queryCounty } from "./queries.js";
// because early node version, i must install node-fetch and import fetch
import fetch from "node-fetch";


const FetchData = (formInfo) => {

  // console.log('FORMINFO: ',formInfo[1]);

  const queryFromForm = {
    query: `{
      ${formInfo}
      }
    }`
  }

  let querySwitch = null;

  switch (formInfo[0]) {
    case 'county':
      querySwitch = queryCounty;
      console.log({querySwitch});
      break;

    case 'municipality':
      querySwitch = `{trafficRegistrationPoints(searchQuery: {query: "${formInfo[1]}"})` + trafficRegPoints;
      break;

    case 'trafficdata':
      querySwitch = `{trafficData(trafficRegistrationPointId: "${formInfo[1]}")` + trafficData;
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

      console.log(JSON.stringify(data, null, 4) );
      
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