import { TrafficVolumeByLengthCsv, getValues, forEach } from "../components/trafficVolumeByLengthCsv";
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
}`

let jsonObj = JSON.parse(jsonData);

test('testing av getValues', () => {
  expect(getValues(jsonObj)).toContainEqual(["74808V805815", "Bønesskogen nord", "VEHICLE", "Vestland", "Bergen", "60.331065", "5.29924"], ["2023-02-02T00:00:00+01:00", "2023-02-02T01:00:00+01:00", "11", "100", "7", "4", "1", "0", "2", "1"]); // Denne fungerer med og uten 'edge' data
  // expect(getValues(jsonObj)).toContainEqual(["74808V805815", "Bønesskogen nord", "VEHICLE", "Vestland", "Bergen", "60.331065", "5.29924" ]); // Denne fungerer
  // expect(getValues(jsonObj)).toContainEqual(["74808V805815", "Bønesskogen nord", "VEHICLE", "Vestland", "Bergen", "60.331065", "5.29924"], ["Contains no data"]); // Denne fungerer uten 'edge' data
  expect(getValues(jsonObj).tmpRowData).toBe([])
})


// const csv = 'id,name,trafficRegistrationType,county,municipality,lat,lon,From,To,total-volume,Total-coverage,LengthRange:..-5.6,LengthRange:5.6-..,LengthRange:5.6-7.6,LengthRange:7.6-12.5,LengthRange:12.5-16,LengthRange:16-24,LengthRange:24-..\r\n' +
// '85010V3144570,RÅDALSKRYSSET SØR RAMPE BERGEN-FANAVEGEN,VEHICLE,Vestland,Bergen,60.288265,5.32636,2023-02-02T00:00:00+01:00,2023-02-02T01:00:00+01:00,7,100,6,1,0,0,1,0,0\r\n'


// test('Checks the final csv object', () => {
//   expect(TrafficVolumeByLengthCsv(jsonObj)).toContainEqual('id,name,trafficRegistrationType,county,municipality,lat,lon,From,To,total-volume,Total-coverage,LengthRange:..-5.6,LengthRange:5.6-..,LengthRange:5.6-7.6,LengthRange:7.6-12.5,LengthRange:12.5-16,LengthRange:16-24,LengthRange:24-..\r\n' +
//   '74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924,2023-02-02T00:00:00+01:00,2023-02-02T01:00:00+01:00,11,100,7,4,1,0,2,1,0\r\n')
// })




// const myMockCallback = jest.fn()
// console.log(mockCallback.mock.results);
// const test1 = new myMockCallback()
test('test TrafficVolumeByLengthCsv med Mock', () => {
  const myMockCallback = jest.fn()
  const test1 = new myMockCallback()
  test1.name = 'test1'
  console.log(myMockCallback.mock);

  const test2 = [];
  test2.name = 'test2';
  const bound = myMockCallback.bind(test2)
  bound()
  console.log(myMockCallback.mock );
  TrafficVolumeByLengthCsv(jsonObj, myMockCallback);
  // expect(mockCallback.mock.results).toContainEqual('id,name,trafficRegistrationType,county,municipality,lat,lon,From,To,total-volume,Total-coverage,LengthRange:..-5.6,LengthRange:5.6-..,LengthRange:5.6-7.6,LengthRange:7.6-12.5,LengthRange:12.5-16,LengthRange:16-24,LengthRange:24-..\r\n' +
  // '74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924,2023-02-02T00:00:00+01:00,2023-02-02T01:00:00+01:00,11,100,7,4,1,0,2,1,0\r\n')
  expect(myMockCallback.mock.calls).toHaveLength(2)
})


jest.mock("../components/trafficVolumeByLengthCsv");

describe('Test TrafficVolumeByLengthCsv med mock 2', () => {
  // beforeEach(() => {
  //   TrafficVolumeByLengthCsv.mockClear();
  // });

  it('Sjekk dataen', () => {
    TrafficVolumeByLengthCsv.mockImplementation(() => {
      return {
        Retrieve: (callback) => callback("tull og tøys")
      }
    })
  })
})


// test('test av mock', () => {
//   TrafficVolumeByLengthCsv (jsonObj)
// })


const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});


test('this', () => {
  const myMock1 = jest.fn();
const a = new myMock1();
a.name = 'a'
console.log(myMock1.mock.instances);
// > [ <a> ]

const b = {};
b.name = 'b'
const bound = myMock1.bind(b);
bound();
console.log(myMock1.mock);
// > [ <b> ]|
})