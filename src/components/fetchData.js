// import { useEffect, useState } from "react";
// import Form from "./Form";
import { trafficRegPoints } from "./queries.js";

const FetchData = (formInfo) => {
  // const [data, setData] = useState(null);

  console.log(formInfo[1]);
  // console.log(Object.keys(formInfo.formData.county.name));
  // console.log(formInfo.formData.county.name);
  // console.log(Object.values(formInfo.formData));
  // console.log(JSON.stringify(formInfo,null,2));

  const queryFromForm = {
    query: `{
      ${formInfo}
      }
    }`
  }

  const queryCounty = `{
    areas {
      counties {
        name
        number
      }
    }
  }`

  let querySwitch = null;

  // console.log(Object.keys(formInfo.formData)[1]);
  // console.log(formInfo.formData.municipality);

  // switch (Object.keys(formInfo.formData)[1]) {
  switch (formInfo[0]) {
    case 'county':
      querySwitch = queryCounty;
      // console.log(querySwitch);
      break;

    case 'municipality':
      querySwitch = `{trafficRegistrationPoints(searchQuery: {query: "${formInfo[1]}"})` + trafficRegPoints;
      console.log({querySwitch});
      break;

    default: 
      console.log('TEST: switch default');
      break;


  }


  // TEST!!
  // let query = "Bergen";
  // console.log(`trafficRegistrationPoints(searchQuery: {query: "Bergen"})` + trafficRegPoints);
  // console.log(`trafficRegistrationPoints(searchQuery: {query: "${formInfo.formData.county.name}"})` + trafficRegPoints);

  const httpOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      query: querySwitch,
    }),
  };

  const fetchApi = async () => {
       await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err))
      // .finally()
  };

  useEffect(() => {
    console.log('RUN: useEffect');
    fetchApi();

  }, [querySwitch]);;

  console.log(data);

  
  
};

export {FetchData}