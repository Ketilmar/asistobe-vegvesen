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


// Denne søker etter reg.punkter som inneholder ordet "Bergen"

// trafficRegistrationPoints(searchQuery: {query: "${queryVar.query}"})
// trafficRegistrationPoints(searchQuery: {query: "Bergen"})
const trafficRegPoints = `
     {
      id
      name
      trafficRegistrationType
      location {
        roadReference {
          shortForm
          roadCategory {
            id
            name
            __typename
          }
          __typename
        }
        coordinates {
          latLon {
            lat
            lon
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }`


  
  

  export {trafficRegPoints}