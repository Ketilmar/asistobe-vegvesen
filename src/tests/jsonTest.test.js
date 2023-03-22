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

let jsonObj = JSON.parse(jsonData);

describe("Test of objectPeeler", () => {
  test("Handling data objects", () => {
    let item1 = [
      "74808V805815",
      "Bønesskogen nord",
      "VEHICLE",
      "Vestland",
      "Bergen",
      "60.331065",
      "5.29924",
    ];
    let item2 = [
      "2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100",
      "Bønes",
      "21",
      "19",
      "2",
      "0",
      "0",
      "0",
      "2",
      "0"
    ];
    let item3 = [
      "2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100",
      "Bråtet",
      "16",
      "13",
      "3",
      "1",
      "0",
      "1",
      "1",
      "0"
    ];

    let actual = objectPeeler(jsonObj);

    expect(actual).toContainEqual(item1);
    expect(actual).toEqual([item1, item2, item3]);
  });

  
  test("Handling id's", () => {
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

    let expectedOutput = objectPeeler(data);
    expect(expectedOutput).toEqual(
      expect.arrayContaining([expect.arrayContaining(["44656V72812"])])
    );
  });
});
