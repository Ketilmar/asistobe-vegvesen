import { TrafficVolumeByLengthCsv, outerFunc, forEach } from "../components/trafficVolumeByLengthCsv";
// const TrafficVolumeByLengthCsv = require('../components/trafficVolumeByLengthCsv')
import {jest} from '@jest/globals'

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
                    }
                        
                    ]
                }
            }
        }
    }
  }`

let jsonObj = JSON.parse(jsonData);

describe('getValues', () => {
    let data;
    let expectedOutput;
    let item1 = ["74808V805815", "Bønesskogen nord", "VEHICLE", "Vestland", "Bergen", "60.331065", "5.29924"]
    let item2 = ["2023-02-02T00:00:00+01:00", "2023-02-02T01:00:00+01:00", "7", "100", "6", "1", "0", "0", "1", "0","0"]
    let actual = outerFunc(jsonObj)
  
    beforeEach(() => {
      // data = undefined;
    //   data = jsonObj
      expectedOutput = undefined;
    });
  
    it('should handle a complete object', () => {
        //data = getValues(jsonObj.data.trafficData.volume.byHour.edges[0])
        expectedOutput = [item1,item2];
  
      expect(actual).toEqual(expectedOutput);
    });
  
    it('should handle objects with byLengthRange', () => {
      data = `{"edges": [
        {"byLengthRange": [
        {
            "total": {
                "volumeNumbers": {
                    "volume": 6
                }
            }
        }]}]}`

        let byLengthRangeData = JSON.parse(data);
        let actual_2 = outerFunc(byLengthRangeData)
      // data = getValues(data.data.trafficData.volume.byHour.edges[0].node.byLengthRange[0].total.volumeNumbers.volume)
    //   expectedOutput = {byLengthRange:[1,2,3]};
    expectedOutput = [6];
  
      expect(actual_2).toEqual(expectedOutput);
    });
  
    it('should handle non-objects', () => {
      data = 1;
      expectedOutput = [['1']];
  
    //   expect(getValues(data)).toEqual(expectedOutput);
    });
  
    it('should handle null inputs', () => {
      data = null;
      expectedOutput = [];
  
    //   expect(getValues(data)).toEqual(expectedOutput);
    });
  });
  