import { useEffect, useState } from "react";

const FetchData = (props) => {
    const [data, setData] = useState(null);

    const { county } = props.formData;
    const httpOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
            query: `{
        trafficRegistrationPoints(searchQuery: {countyNumbers: ${county.number}}) {
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
        await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.log(err));
        // .finally()
    };

    // useEffect(() => {
    //     fetchApi();
    // }, []);

    console.log(data);

    return <>{JSON.stringify(data)}</>;
};

export { FetchData };
