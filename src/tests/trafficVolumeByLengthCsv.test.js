import { TrafficVolumeByLengthCsv, getValues } from "../components/trafficVolumeByLengthCsv";
// const TrafficVolumeByLengthCsv = require('../components/trafficVolumeByLengthCsv')
import { FileWriter, FileDeleter } from "../components/fileWriter";
import {expect, jest} from '@jest/globals'
import { exampleTrafficVolumeByLength } from "./exampleJsonData";




describe('getValues', () => {
    let json;
    let actual;
    let expectedOutput;
    const jsonObj = JSON.parse(exampleTrafficVolumeByLength);
    
  
    it('should handle a complete object', () => {
        let id = ["74808V805815", "Bønesskogen nord", "VEHICLE", "Vestland", "Bergen", "60.331065", "5.29924"]
        let node= ["2023-02-02T00:00:00+01:00", "2023-02-02T01:00:00+01:00", "7", "100", "6", "1", "0", "0", "1", "0","0"]
        
        actual = getValues(jsonObj)
        expectedOutput = [id,node];
  
      expect(actual).toEqual(expectedOutput);
    });


    it('should handle id items', () => {
        json = `{"data": [
                    {"trafficRegistrationPoint": {
                        "id": "74808V805815",
                        "name": "Bønesskogen nord"
                    }}
                    ]
                }`

        let byLengthRangeData = JSON.parse(json);
        
        actual = getValues(byLengthRangeData)
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
        
        actual = getValues(byLengthRangeData)
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
        
        actual = getValues(nodeData)
        expectedOutput = [[],["7", "100"]];
  
        expect(actual).toEqual(expectedOutput);
    });


    it('Should handle empty edge data', () => {
        json = `{"data":
                    {
                        "edges": []
                    }
                }`

        let noEdgeData = JSON.parse(json);
        
        actual = getValues(noEdgeData)
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