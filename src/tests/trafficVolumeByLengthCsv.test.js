import { TrafficVolumeByLengthCsv } from "../components/trafficVolumeByLengthCsv";
// const TrafficVolumeByLengthCsv = require('../components/trafficVolumeByLengthCsv')
import { FileWriter, FileDeleter } from "../components/fileWriter";
import {expect, jest} from '@jest/globals'
import { exampleTrafficVolumeByLength } from "./exampleJsonData";
import { objectPeeler } from "../components/objectPeeler";




describe('objectPeeler', () => {
    let json;
    let actual;
    let expectedOutput;
    const jsonObj = JSON.parse(exampleTrafficVolumeByLength);
    
  
    it('should handle a complete object', () => {
        let id = ["74808V805815", "Bønesskogen nord", "VEHICLE", "Vestland", "Bergen", "60.331065", "5.29924"]
        let node1 = [
            "2023-02-02T00:00:00+01:00,2023-02-02T01:00:00+01:00,11,100",
            "Bønes",
            "4",
            "1",
            "3",
            "1",
            "0",
            "1",
            "1",
            "0",
          ];
          let node2 = [
            "2023-02-02T00:00:00+01:00,2023-02-02T01:00:00+01:00,11,100",
            "Bråtet",
            "7",
            "6",
            "1",
            "0",
            "0",
            "1",
            "0",
            "0",
          ]
        
        actual = objectPeeler(jsonObj)
        expectedOutput = [id,node1, node2];
  
      expect(actual).toEqual(expectedOutput);
    });


    it('should handle id items', () => {
        json = `{"data":
                    {"trafficRegistrationPoint": [{
                        "id": "74808V805815",
                        "name": "Bønesskogen nord"
                        }
                    ]
                    },
                    "volume": {
                        "byHour": {
                            "edges": [
                                {
                                    "node": {
                                        "from": "2023-02-02T00:00:00+01:00",
                                        "to": "2023-02-02T01:00:00+01:00"
                                    }
                                }
                            ]
                        }
                    }
                }`

        let byLengthRangeData = JSON.parse(json);
        
        actual = objectPeeler(byLengthRangeData)
        expectedOutput = [["74808V805815", "Bønesskogen nord"]];
  
        expect(actual).toEqual(expectedOutput);
    });
  

    it('should handle objects with byLengthRange', () => {
        json = `{"data": [
                    {"byLengthRange": [
                        {
                            "total": {
                                "volumeNumbers": {
                                    "volume": 6
                                }
                            }
                        }]
                    }]
                }`

        let byLengthRangeData = JSON.parse(json);
        
        actual = objectPeeler(byLengthRangeData)
        expectedOutput = [[],["6"]];
  
        expect(actual).toEqual(expectedOutput);
    });


    it('should handle objects with empty byLengthRange', () => {
        json = `{"data": [
                    {"node": {
                        "total": {
                            "volumeNumbers": {
                                "volume": 7
                                },
                            "coverage": {
                                "percentage": 100
                            }
                        }
                    },
                
                    "byLengthRange": []
                    }]
                }`

        let nodeData = JSON.parse(json);
        
        actual = objectPeeler(nodeData)
        expectedOutput = [[],["7", "100"]];
  
        expect(actual).toEqual(expectedOutput);
    });


    // whats important so see here is that the value in 'percentage' takes the first index of the array, which is not it's place.
    // Maybe fix the function to handle this
    it('should handle objects with null total-volumenumbers', () => {
        json = `{"data": [
                    {"node": {
                        "total": {
                            "volumeNumbers": null,
                            "coverage": {
                                "percentage": 0
                            }
                        }
                    },
                
                    "byLengthRange": []
                    }]
                }`

        let nodeData = JSON.parse(json);
        
        actual = objectPeeler(nodeData)
        expectedOutput = [[],["0"]];
  
        expect(actual).toEqual(expectedOutput);
    });


    it('Should handle empty edge data', () => {
        json = `{"data":
                    {"trafficRegistrationPoint": {
                        "id": "74808V805815",
                        "name": "Bønesskogen nord"
                        }
                    },
                    "volume": {
                        "byHour": {
                            "edges": []
                        }
                    }
                }`

        let noEdgeData = JSON.parse(json);
        
        actual = objectPeeler(noEdgeData)
        expectedOutput = [[],['No data']];

        expect(actual).toEqual(expectedOutput);
    });
  });



  describe('TrafficVolumeByLengthCsv', () => {
    let json;
    let actual;
    let expectedOutput;
    let id = ["74808V805815", "Bønesskogen nord", "VEHICLE", "Vestland", "Bergen", "60.331065", "5.29924"]
    let node= ["2023-02-02T00:00:00+01:00", "2023-02-02T01:00:00+01:00", "7", "100", "6", "1", "0", "0", "1", "0","0"]   
    let jsonObj = JSON.parse(exampleTrafficVolumeByLength);
    const jestCallback = jest.fn();
    // FileWriter('jestTest.csv', 'filecontent', 'Jest wrote a tesfile');
    TrafficVolumeByLengthCsv(jsonObj, 'jestTest.csv', jestCallback);

    it('Should extract idInfo', () => {
        expectedOutput = id
        actual = jestCallback.mock.calls[0][0]

        expect(actual).toEqual(expectedOutput)
    })


    it('should have a complete row of trafficdata', () => {
        expectedOutput = [id.toString() , ...node]
        actual = jestCallback.mock.calls[1][0]

        expect(actual).toEqual(expectedOutput)
    })


    it('Should have a ready csv string with header, if file not existing.', () => {
        expectedOutput = "id,name,trafficRegistrationType,county,municipality,lat,lon,From,To,total-volume,Total-coverage,LengthRange:..-5.6,LengthRange:5.6-..,LengthRange:5.6-7.6,LengthRange:7.6-12.5,LengthRange:12.5-16,LengthRange:16-24,LengthRange:24-..\r\n74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924,2023-02-02T00:00:00+01:00,2023-02-02T01:00:00+01:00,7,100,6,1,0,0,1,0,0";
        actual = jestCallback.mock.lastCall[0]

        expect(actual).toEqual(expectedOutput)
    })

    it('Should have a ready csv string without header', () => {
        FileWriter('jestTest.csv', 'filecontent', 'Jest wrote a tesfile');
        expectedOutput = "\r\n74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924,2023-02-02T00:00:00+01:00,2023-02-02T01:00:00+01:00,7,100,6,1,0,0,1,0,0";
        actual = jestCallback.mock.calls[2][0]

        expect(actual).toEqual(expectedOutput)
        FileDeleter('jestTest.csv')
    })

  });