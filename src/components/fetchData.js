// todo: enable GraphQL queries from user input

import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState([]);

  const httpParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      query: `{
        trafficRegistrationPoints(searchQuery: { roadCategoryIds: [E] }) {
          id
          name
          location {
            coordinates {
              latLon {
                lat
                lon
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
        setData(data);
        console.log(data);

    } catch (err) {
      setData(null);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi();

    // cleanup
    return () => {
      setData(null)
    }
  },[])

  console.log(data);

  return (
    <>
    <div>{data.data.trafficRegistrationPoints[8].id}</div>
    </>
  )
};

export {FetchData}
