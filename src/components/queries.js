// Variabler:
const queryVar =
{
    selectedRoadCategories: [
      "E",
      "R"
    ],
    trpIds: "44656V72812",
    trpid: "44656V72812",
    from: "2022-11-17T23:00:00.000Z",
    to: "2022-11-18T23:00:00.000Z",
    selectedCounties: [
      "46"
    ],
    selectedMunicipalities: [
      "5043"
    ],
    query: "Bergen"
  }

  // get a list of countys
  const queryCounty = `{
    areas {
      counties {
        name
        number
      }
    }
  }`

// Denne søker etter reg.punkter som inneholder ordet "Bergen"
const trafficRegPointsQuery = `
     {
      id
      name
      trafficRegistrationType
      location {
        county {
          name
          number
        }
        municipality {
          name
          number
        }
        roadReference {
          shortForm
          roadCategory {
            id
            name
          }
        }
        coordinates {
          latLon {
            lat
            lon
          }
        }
      }
    }
  }`


// Get a list of all reg.points
const trafficRegPoints = ` 
{trafficRegistrationPoints{
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
}`




  // collects data from specified trafficRegistrationPoint
  const trafficData = `{
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
        byHour(from: "2020-01-01T12:00:00+02:00", to: "2022-10-24T14:00:00+02:00") {
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
  }`


  
  

  export {trafficRegPoints, trafficRegPointsQuery, trafficData, queryCounty}