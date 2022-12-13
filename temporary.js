const Counties = require("./my-data/my-json/counties.json");
const Municipalities = require("./my-data/my-json/municipalities.json");
const prompt = require("prompt-sync")({ sigint: true });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Koden kan enten kjøres lokalt eller i egen Docker container
// For å kjøre koden lokalt må du skrive følgende kommandoer i terminalen:
// npm install
// node temporary.js

const countiesList = Counties.map((county) => {
  return county.name;
});

const municipalityList = Municipalities.map((municipality) => {
  return municipality.name;
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const county = capitalizeFirstLetter(prompt("Give a county: "));
console.log(county);

const municipality = capitalizeFirstLetter(prompt("Give a municipality: "));
console.log(municipality);

const dateFrom = prompt("Give a from date (yyyy-mm-dd): ");
console.log(dateFrom);

const dateTo = prompt("Give a to date (yyyy-mm-dd): ");
console.log(dateTo);

const response = prompt("Do the dates have the correct format? ");

const dateCheck = () => {
  if (response === "yes") {
    inputChecker(county, municipality, dateFrom, dateTo);
  } else {
    console.log("Try again");
  }
};

const inputChecker = (county, municipality, dateFrom, dateTo) => {
  if (
    countiesList.includes(county) &&
    municipalityList.includes(municipality)
  ) {
    FetchData(county, municipality, dateFrom, dateTo);
  } else {
    console.log("Wrong county or municipality name");
  }
};

const FetchData = (county, municipality, dateFrom, dateTo) => {
  let sortedIds = [];
  let exampleIds = [];
  const dateFromString = `${dateFrom}T07:00:00+02:00`;
  const dateToString = `${dateTo}T07:00:00+02:00`;

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
                  byDay(from: "${dateFromString}", to: "${dateToString}") {
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

  fetchApi();
  setTimeout(fetchApi2, 2000);
};

dateCheck();
