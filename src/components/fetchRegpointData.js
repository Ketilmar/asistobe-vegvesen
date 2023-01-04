import { trafficData } from "./queries.js";

const FetchRegpointData = (trafficPointsArray) => {
  
  const fetchApi = async (id) => {
        await fetch("https://www.vegvesen.no/trafikkdata/api/", 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify({
              query: `{trafficData(trafficRegistrationPointId: "${id}")` + trafficData,
            }),
          })
        //   .then((res) => console.log(res.statusText))
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    };


    fetchApi(trafficPointsArray[8])
    // trafficPointsArray.map(id => {
    //     fetchApi(id);
    //     // console.log(id);
    // });
};


export {FetchRegpointData}