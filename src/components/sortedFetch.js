import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState(null);
  let sortedIds = [];
  let exampleIds = [];
  const county = "Vestland";
  const municipality = "Bergen";
  const dateFrom = "2020-01-01T12:00:00+02:00";
  const dateTo = "2022-10-24T14:00:00+02:00";

  const httpOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      query: `{
        trafficRegistrationPoints {
          id
          name
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
    await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
      .then((res) => res.json())
      .then((resData) => {
        const allData = resData.data.trafficRegistrationPoints;
        for (let eachArray of allData) {
          if (
            eachArray.location.county.name === county &&
            eachArray.location.municipality.name === municipality
          ) {
            setData(eachArray);
            sortedIds.push(eachArray.id);
          }
        }
        exampleIds.push(sortedIds[0], sortedIds[1], sortedIds[2], sortedIds[3]);
      })
      .catch((err) => console.error(err));
  };

  const fetchApi2 = async () => {
    for (let id of exampleIds) {
      console.log(exampleIds);
      await fetch("https://www.vegvesen.no/trafikkdata/api/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          query: `{
              trafficData(trafficRegistrationPointId: "${id}") {
                trafficRegistrationPoint {
                  id
                  name
                  location {
                    county {
                      name
                    }
                    municipality {
                      name
                    }
                    coordinates {
                        latLon {
                        lat
                        lon
                      }
                    }
                  }
                }
                volume {
                  byHour(from: "${dateFrom}", to: "${dateTo}") {
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
                        byLengthRange {
                          lengthRange {
                            lowerBound
                            upperBound
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchApi();
    setTimeout(fetchApi2, 2000);
  }, []);

  return <>{JSON.stringify(data)}</>;
};

export { FetchData };
