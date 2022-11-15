// todo: enable GraphQL queries from user input

import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState(null);

  const httpParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      query: `{
        trafficRegistrationPoints {
          location {
            county {
              name
              number
            }
            municipality {
              name
              number
            }
          }
        }
      }`,
    }),
  };

  const fetchApi = async () => {
       await fetch("https://www.vegvesen.no/trafikkdata/api/", httpParams)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    fetchApi();

  }, [])

  console.log(data);

  
  return (
    <>
    {JSON.stringify(data)}
    </>
  )
};

export {FetchData}
