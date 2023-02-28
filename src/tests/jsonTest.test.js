import { getValues } from "../components/trafficVolumeByLengthCsv";

const jsonData = `{
    "data": {
        "trafficData": {
            "trafficRegistrationPoint": {
                "id": "74808V805815",
                "name": "Bønesskogen nord",
                "trafficRegistrationType": "VEHICLE",
                "direction": {
                    "fromAccordingToRoadLink": "Bråtet", 
                    "toAccordingToRoadLink": "Bønes"
                },
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
                        ],
                        "total": {
                          "volumeNumbers": {
                            "volume": 37
                          },
                          "coverage": {
                            "percentage": 100
                          }
                        },
                        "byLengthRange": [
                          {
                            "total": {
                              "volumeNumbers": {
                                "volume": 32
                              }
                            }
                          },
                          {
                            "total": {
                              "volumeNumbers": {
                                "volume": 5
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
                                "volume": 3
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
                    }
                ]
            }
          }
        }
    }
}`;

let jsonObj = JSON.parse(jsonData);

describe("CSV test", () => {
  test("testing av getValues", () => {
    let item1 = [
      "74808V805815",
      "Bønesskogen nord",
      "VEHICLE",
      "Bråtet",
      "Bønes",
      "Vestland",
      "Bergen",
      "60.331065",
      "5.29924",
    ];
    let item2 = [
      "2023-02-25T00:00:00+01:00",
      "2023-02-25T01:00:00+01:00",
      "Bønes",
      "21",
      "19",
      "2",
      "0",
      "0",
      "0",
      "2",
      "0",
      "Bråtet",
      "16",
      "13",
      "3",
      "1",
      "0",
      "1",
      "1",
      "0",
      "37",
      "100",
      "32",
      "5",
      "1",
      "0",
      "1",
      "3",
      "0",
    ];

    let actual = getValues(jsonObj);

    expect(actual).toContainEqual(item1); // Denne fungerer med og uten 'edge' data
    expect(actual).toContainEqual(item2);
    //expect(item2).toHaveLength(11)
    //expect(actual).toEqual([item1,item2])
  });
});
