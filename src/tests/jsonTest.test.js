import { getValues } from "../components/trafficVolumeByLengthCsv";

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
                            "from": "2023-02-02T00:00:00+01:00",
                            "to": "2023-02-02T01:00:00+01:00",
                            "total": {
                                "volumeNumbers": {
                                    "volume": 7
                                },
                                "coverage": {
                                    "percentage": 100
                                }
                            },
                            "byLengthRange": [
                                {
                                    "total": {
                                        "volumeNumbers": {
                                            "volume": 6
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
                                }
                            ]
                        }
                    },
                    {
                        "node": {
                            "from": "2023-02-02T01:00:00+01:00",
                            "to": "2023-02-02T02:00:00+01:00",
                            "total": {
                                "volumeNumbers": {
                                    "volume": 2
                                },
                                "coverage": {
                                    "percentage": 100
                                }
                            },
                            "byLengthRange": [
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
      "Vestland",
      "Bergen",
      "60.331065",
      "5.29924",
    ];
    let item2 = [
      "2023-02-02T00:00:00+01:00",
      "2023-02-02T01:00:00+01:00",
      "7",
      "100",
      "6",
      "1",
      "0",
      "0",
      "1",
      "0",
      "0",
    ];
    let actual = getValues(jsonObj);

    expect(actual).toContainEqual(item1); // Denne fungerer med og uten 'edge' data
    expect(actual).toContainEqual(item2);
    //expect(item2).toHaveLength(11)
    //expect(actual).toEqual([item1,item2])
  });
});
