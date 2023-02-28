import moment from "moment/moment";
import { inputCheck } from "../components/fetchData";
import { trafficVolumeByLength } from "../components/queries";
import { getValues } from "../components/trafficVolumeByLengthCsv"
//import fs from "fs"


// test("file", () => {
//   const readTest = (file) => {
//     fs.readFile(file, "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   })}

//   expect(readTest("result.txt")).toMatch("07721V3144565")
// })

describe("Date number tests", () => {
  test("Date inputs", () => {
    // arrange and act
    let opposite = inputCheck("10-11-2022", "11-11-2022")
    let incomplete = inputCheck("2022-11", "2022-11-10")
    let emptyStringWithSpace = inputCheck(" ", " ")
    let empty = inputCheck("", "")
    let inputTest = inputCheck("2022-12-30", "2022-02-06");
    let testFail = inputCheck("2022-13-30", "2022-05-05");
    let testFormat = inputCheck("2022.12.30", "2022.12.31");
    let testDate = "2022-02-05";
    let dateTest = moment().subtract(1, "days").format("YYYY-MM-DD");
    let regEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    //assert
    expect(opposite).toBeFalsy()
    expect(incomplete).toBeFalsy()
    expect(emptyStringWithSpace).toBeFalsy()
    expect(empty).toBeFalsy()
    expect(inputTest).not.toBeFalsy();
    expect(testFail).toBeFalsy();
    expect(testFormat).toBeFalsy();
    expect(testDate).toMatch(regEx);
    expect(dateTest).toMatch(regEx);
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
        byHour(from: "2023-02-05T00:00:00+01:00", to: "2023-02-06T00:00:00+01:00") {
          edges {
            node {
              from
              to
              byDirection {
                heading
                total {
                  volumeNumbers {
                    volume
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
