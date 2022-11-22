import { useEffect, useState } from "react";
// import Form from "./Form";
import { trafficRegPoints } from "./queries";

const FetchData = (dataFraForm) => {
  const [data, setData] = useState([]);

  // console.log(Object.keys(dataFraForm.formData.county.name));
  console.log(dataFraForm.formData.county.name);
  console.log(Object.keys(dataFraForm.formData)[0]);
  console.log(JSON.stringify(dataFraForm,null,2));

  const queryFromForm = {
    query: `{
      ${dataFraForm.formData.county}
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

  switch (Object.keys(dataFraForm.formData)[1]) {
    case 'county':
      querySwitch = queryCounty;
      // console.log(querySwitch);
      break;

    case 'municipality':
      querySwitch = `{trafficRegistrationPoints(searchQuery: {query: "${dataFraForm.formData.municipality}"})` + trafficRegPoints;
      console.log(querySwitch);
      break;

    default: break;

  }


  // TEST!!
  // let query = "Bergen";
  // console.log(`trafficRegistrationPoints(searchQuery: {query: "Bergen"})` + trafficRegPoints);
  // console.log(`trafficRegistrationPoints(searchQuery: {query: "${dataFraForm.formData.county.name}"})` + trafficRegPoints);

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
    fetchApi();

  }, [])

  console.log(data);

  
  return (
    <>
    {/* <TestForm passData={data}/> */}
    {/* <Form apiData={data} /> */}
    </>
  )
  
};

export {FetchData}
