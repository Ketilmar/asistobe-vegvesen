
  // get a list of counties
  const queryCounty = `{
    areas {
      counties {
        name
        number
      }
    }
  }`

  // get a list of municipalities
  const queryMunicipality = `{
    areas {
      municipalities {
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
        byHour(from: "${dateFrom}T00:00:00+01:00", to: "${dateTo}T00:00:00+01:00") {
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

  
  const trafficVolume = (id, dateFrom, dateTo) => {
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
        byHour(from: "${dateFrom}T00:00:00+01:00", to: "${dateTo}T00:00:00+01:00") {
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
  }`
}

  const trafficVolumeByLength = (id, dateFrom, dateTo) => {
    return `{trafficData(trafficRegistrationPointId: "${id}") {
      trafficRegistrationPoint {
        id
        name
        trafficRegistrationType
        direction {
          fromAccordingToRoadLink
          toAccordingToRoadLink
        }
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
        byHour(from: "${dateFrom}T00:00:00+01:00", to: "${dateTo}T00:00:00+01:00") {
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
                total {
                  volumeNumbers {
                    volume
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
}

  
  

  export {trafficRegPoints, trafficRegPointsQuery, trafficData, trafficVolumeByLength, trafficVolume,  queryCounty, queryMunicipality}