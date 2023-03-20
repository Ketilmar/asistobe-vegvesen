import { FileWriter } from "./fileWriter.js";
import fs from "fs";
import { objectPeeler } from "./objectPeeler.js";

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

const callFunction = () => {
  let jsonObj = JSON.parse(jsonData);
  TrafficVolumeByLengthCsv(jsonObj, "path5.csv");
};

/** Parses data object from 'trafficVolumeByLength' query. Converts to csv and sends object to FileWriter() */
const TrafficVolumeByLengthCsv = (data, path) => {
  let returnedRowData = objectPeeler(data);
  //let finalData = returnRowData(returnedRowData)
  csvWriter(returnRowData(returnedRowData), path);
};

const returnRowData = (returnedRowData) => {
  // extract data for adding to each row later (id, name, county, municipality, lat, lon)
  let idInfo = returnedRowData.shift();
  console.log(idInfo[0]);

  // put in 'idInfo' in each row
  for (let item in returnedRowData) {
    returnedRowData[item].unshift(idInfo.toString());
  }

  return [returnedRowData, idInfo];
};

const csvWriter = (returnedRowData, path) => {
  // if file exists (and thus header too), replace header object with empty array for new rows
  if (fs.existsSync(path)) {
    let csv = [[], ...returnedRowData[0]].join("\r\n");
    FileWriter(
      path,
      csv,
      `ID ${returnedRowData[1]} - Write row without header -->`
    );
  } else {
    // Headers must be defined manually
    let manualHeaders = [
      "id",
      "name",
      "trafficRegistrationType",
      "county",
      "municipality",
      "lat",
      "lon",
      "From",
      "To",
      "total-volume",
      "Total-coverage",
      "Heading",
      "Total",
      "LengthRange:..-5.6",
      "LengthRange:5.6-..",
      "LengthRange:5.6-7.6",
      "LengthRange:7.6-12.5",
      "LengthRange:12.5-16",
      "LengthRange:16-24",
      "LengthRange:24-..",
    ];
    // join header and body, and break into separate rows
    let csv = [manualHeaders, ...returnedRowData[0]].join("\r\n");
    FileWriter(
      path,
      csv,
      `ID ${returnedRowData[1]} - Write row with header -->`
    );
  }
};

callFunction();
