import { returnRowData } from "../components/testActualRefactor.js";
import { objectPeeler } from "../components/objectPeeler";

const jsonData = `{
    "data": {
        "trafficData": {
            "trafficRegistrationPoint": {
                "id": "74808V805815",
                "name": "Bønesskogen nord",
                "trafficRegistrationType": "VEHICLE",
                "location": {
                    "county": {
                        "name": "Vestland"
                    },
                    "municipality": {
                        "name": "Bergen"
                    },
                    "coordinates": {
                        "latLon": {
                            "lat": 60.331065,
                            "lon": 5.29924
                        }
                    }
                }
            },
            "volume": {
                "byHour": {
                  "edges": [
                    {
                      "node": {
                        "from": "2023-02-25T00:00:00+01:00",
                        "to": "2023-02-25T01:00:00+01:00",
                        "total": {
                          "volumeNumbers": {
                            "volume": 37
                          },
                          "coverage": {
                            "percentage": 100
                          }
                        },
                        "byDirection": [
                          {
                            "heading": "Bønes",
                            "total": {
                              "volumeNumbers": {
                                "volume": 21
                              }
                            },
                            "byLengthRange": [
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 19
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 2
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 0
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 0
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 0
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 2
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 0
                                  }
                                }
                              }
                            ]
                          },
                          {
                            "heading": "Bråtet",
                            "total": {
                              "volumeNumbers": {
                                "volume": 16
                              }
                            },
                            "byLengthRange": [
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 13
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 3
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 1
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 0
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 1
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 1
                                  }
                                }
                              },
                              {
                                "total": {
                                  "volumeNumbers": {
                                    "volume": 0
                                  }
                                }
                              }
                            ]
                          }
                        ]
                      }
                    }
                ]
            }
          }
        }
    }
}`;

const jsonObj = JSON.parse(jsonData);

let expectedOutput1 = [
  "74808V805815",
  "Bønesskogen nord",
  "VEHICLE",
  "Vestland",
  "Bergen",
  "60.331065",
  "5.29924",
];

let expectedOutput2 = [
  [
    "74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924",
    "2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100",
    "Bønes",
    "21",
    "19",
    "2",
    "0",
    "0",
    "0",
    "2",
    "0",
  ],
  [
    "74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924",
    "2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100",
    "Bråtet",
    "16",
    "13",
    "3",
    "1",
    "0",
    "1",
    "1",
    "0",
  ],
];

describe("testActualRefactor", () => {
  test("returnRowData", () => {
    let returnedRowData = objectPeeler(jsonObj);
    let result = returnRowData(returnedRowData);
    let actual1 = result[1];
    let actual2 = result[0];

    expect(actual1).toStrictEqual(expectedOutput1);
    expect(actual2).toStrictEqual(expectedOutput2);
  });
});
