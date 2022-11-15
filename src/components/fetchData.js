// todo: enable GraphQL queries from user input

import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState();

  const httpParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      query: `{
        trafficData(trafficRegistrationPointId: "44656V72812") {
          volume {
            byHour(
              from: "2019-10-24T12:00:00+02:00"
              to: "2019-10-24T14:00:00+02:00"
            ) {
              edges {
                node {
                  from
                  to
                  total {
                    volumeNumbers {
                      volume
                    }
                    coverage {
                      percentage
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    }),
  };

  const fetchApi = async () => {

    try {
      const data = await fetch(
        "https://www.vegvesen.no/trafikkdata/api/", httpParams).then((res) => res.json());
        setData(data)
        // console.log(data);

    } catch (err) {
      setData(null);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi();

    // cleanup
    // return () => {
    //   setData(null)
    // }
  }, )

  console.log(data);

  
  return (
    <>
    {JSON.stringify(data)}
    </>
  )
};

export {FetchData}
