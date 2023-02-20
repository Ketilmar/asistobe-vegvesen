import moment from "moment/moment";
import { inputCheck } from "../components/fetchData";
import {
  filterByCounty,
  filterByMunicipality,
  getAll,
} from "../components/filterTrafficPoints";
import { trafficVolumeByLength } from "../components/queries";
import { getValues } from "../components/trafficVolumeByLengthCsv"


describe("Date number conversion tests", () => {
  test("Date inputs", () => {
    // arrange and act
    let testDate = "2023-02-05";
    let testFail = inputCheck("2023-13-30", "2023-05-05");
    let testFormat = inputCheck("2023.12.30", "2023.12.31");
    let inputTest = inputCheck("2023-12-30", "2023-02-06");
    let dateTest = moment().subtract(1, "days").format("YYYY-MM-DD");
    let regEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    //assert
    expect(inputTest).not.toBeFalsy();
    expect(dateTest).toMatch(regEx);
    expect(testDate).toMatch(regEx);
    expect(testFail).toBeFalsy();
    expect(testFormat).toBeFalsy();
  });
});

describe("CSV tests", () => {
  test("getValues", () => {
    let data = {
      data: {
        trafficData: {
          trafficRegistrationPoint: {
            id: "44656V72812",
            name: "Elgeseter gate ved Abels gate",
            location: {
              county: {
                name: "Trøndelag",
              },
              municipality: {
                name: "Trondheim",
              },
              coordinates: {
                latLon: {
                  lat: 63.416654,
                  lon: 10.397405,
                },
              },
            },
          },
          volume: {
            byHour: {
              edges: [
                {
                  node: {
                    from: "2023-02-05T00:00:00+01:00",
                    to: "2023-02-05T01:00:00+01:00",
                    total: {
                      volumeNumbers: {
                        volume: 605,
                      },
                      coverage: {
                        percentage: 100,
                      },
                    },
                    byLengthRange: [
                      {
                        total: {
                          volumeNumbers: {
                            volume: 539,
                          },
                        },
                      },
                      {
                        total: {
                          volumeNumbers: {
                            volume: 66,
                          },
                        },
                      },
                      {
                        total: {
                          volumeNumbers: {
                            volume: 11,
                          },
                        },
                      },
                      {
                        total: {
                          volumeNumbers: {
                            volume: 13,
                          },
                        },
                      },
                      {
                        total: {
                          volumeNumbers: {
                            volume: 16,
                          },
                        },
                      },
                      {
                        total: {
                          volumeNumbers: {
                            volume: 21,
                          },
                        },
                      },
                      {
                        total: {
                          volumeNumbers: {
                            volume: 5,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    };

    let result = getValues(data);
    console.log(result);
    expect(result).toEqual(
      expect.arrayContaining([expect.arrayContaining(["44656V72812"])])
    );
  });
});

test("Query function", () => {
  const params = ["4534V453453B", "2023-02-05", "2023-02-06"];
  const queryTest = trafficVolumeByLength(params[0], params[1], params[2]);

  let item1 = `{trafficData(trafficRegistrationPointId: "4534V453453B") {`;
  let item2 = `byHour(from: "2023-02-05T00:00:00+01:00", to: "2023-02-06T00:00:00+01:00") {`;

  const queryObj = `{trafficData(trafficRegistrationPointId: "4534V453453B") {
      trafficRegistrationPoint {
        id
        name
        trafficRegistrationType
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
        byHour(from: "2023-02-05T00:00:00+01:00", to: "2023-02-06T00:00:00+01:00") {
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
  }`;

  expect(queryTest).toContain(item1);
  expect(queryTest).toContain(item2);
  expect(queryTest).toMatch(queryObj);
});

const testData = `{
  "data": {
    "trafficRegistrationPoints": [
{
  "id": "06872V2518838",
  "name": "Rampe Loddefjord - Bergen",
  "location": {
    "county": {
      "name": "Vestland",
      "number": 46
    },
    "municipality": {
      "name": "Bergen",
      "number": 4601
    }
  }
},
{
  "id": "57587V805035",
  "name": "STORAVATN, RAMPE FRA BERGEN",
  "location": {
    "county": {
      "name": "Vestland",
      "number": 46
    },
    "municipality": {
      "name": "Bergen",
      "number": 4601
    }
  }
},
{
  "id": "32259V22202",
  "name": "BERGENDAL VEST",
  "location": {
    "county": {
      "name": "Agder",
      "number": 42
    },
    "municipality": {
      "name": "Tvedestrand",
      "number": 4213
    }
  }
}
]
}
}`;

let result1 = `
{
"id": "06872V2518838",
"name": "Rampe Loddefjord - Bergen",
"location": {
"county": {
  "name": "Vestland",
  "number": 46
},
"municipality": {
  "name": "Bergen",
  "number": 4601
}
}
}`;

let result2 = `
{
"id": "57587V805035",
"name": "STORAVATN, RAMPE FRA BERGEN",
"location": {
"county": {
  "name": "Vestland",
  "number": 46
},
"municipality": {
  "name": "Bergen",
  "number": 4601
}
}
}`;

let result3 = `
{
  "id": "32259V22202",
  "name": "BERGENDAL VEST",
  "location": {
    "county": {
      "name": "Agder",
      "number": 42
    },
    "municipality": {
      "name": "Tvedestrand",
      "number": 4213
    }
  }
}`

let jsonObj = JSON.parse(testData);
let jsonResult1 = JSON.parse(result1);
let jsonResult2 = JSON.parse(result2);
let jsonResult3 = JSON.parse(result3);

describe("FilterTrafficPoints functions", () => {
  test("municipality", () => {
    let muniTest = filterByMunicipality("bergen", jsonObj);
    
    expect(muniTest).toEqual(expect.arrayContaining([jsonResult1]));
    expect(muniTest).toEqual(expect.arrayContaining([jsonResult2]));
    expect(muniTest).not.toEqual(expect.arrayContaining([jsonResult3]));

    expect(muniTest).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "06872V2518838" })])
    );
    expect(muniTest).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "57587V805035" })])
    );
    expect(muniTest).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "32259V22202" })])
    );
  });

  test("county", () => {    
    let countyTest = filterByCounty("vestland", jsonObj);
    
    expect(countyTest).toEqual(expect.arrayContaining([jsonResult1]));
    expect(countyTest).toEqual(expect.arrayContaining([jsonResult2]));
    expect(countyTest).not.toEqual(expect.arrayContaining([jsonResult3]));

    expect(countyTest).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "06872V2518838" })])
    );
    expect(countyTest).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "57587V805035" })])
    );
    expect(countyTest).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "32259V22202" })])
    );
  });

  test("getAll", () => {
    let getAllTest = getAll(jsonObj)

    expect(getAllTest).toEqual(expect.arrayContaining([jsonResult1]));
    expect(getAllTest).toEqual(expect.arrayContaining([jsonResult2]));
    expect(getAllTest).toEqual(expect.arrayContaining([jsonResult3]));

    expect(getAllTest).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "06872V2518838" })])
    );
    expect(getAllTest).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "57587V805035" })])
    );
    expect(getAllTest).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "32259V22202" })])
    );

  })
});
