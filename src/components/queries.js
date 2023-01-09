
  // get a list of countys
  const queryCounty = `{
    areas {
      counties {
        name
        number
      }
    }
  }`

// This query is used to search for trafficpoints
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
  const trafficData = (id, dateFrom, dateTo) => {
    return `{trafficData(trafficRegistrationPointId: "${id}") {
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
        byDay(from: "${dateFrom}T19:00:00+01:00", to: "${dateTo}T21:00:00+01:00") {
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
}


  
  

  export {trafficRegPoints, trafficRegPointsQuery, trafficData, queryCounty}