import { useEffect, useState } from "react";

const useFetchData = (formData) => {
    const [data, setData] = useState(null);
    const [cleanedData, setCleanedData] = useState(null);

    const { county, municipality, dateFrom, dateTo } = formData;

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
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => console.log(err));
        // .finally()
    };

    useEffect(() => {
        if (formData.county.number === undefined) {
            console.log("Didnt run");
            return;
        }
        fetchApi();
    }, [formData]);

    return data;
};

export default useFetchData;
