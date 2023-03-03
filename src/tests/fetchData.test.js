
import { beforeEach, expect, jest } from '@jest/globals';
// import { FetchData, fetchApi } from '../components/fetchData.js';
import { trafficRegPoints } from '../components/queries.js';
import { fromDateDefault, toDateDefault } from '../components/getDefaultDates.js';
import { exampleTrafficRegPoints } from './exampleJsonData.js';
import { jestTest } from '../components/fetchData.js';
import { it } from 'node:test';
// import fetch from 'node-fetch';


// describe('fetchData.js', () => {
//     const jestCallback = jest.fn();
//     let actual;
//     let expectedOutput;
//     FetchData('-c', 'bergen', fromDateDefault, toDateDefault, 'jestTestFetchData.csv', jestCallback)
//     // FetchData('-c', jestCallback)

//     it('should get something', () => {
//         expectedOutput = trafficRegPoints;
//         actual = jestCallback.mock.calls[0][0];

//         expect(actual).toBe(expectedOutput);
//     });
// });



// let noe = exampleTrafficRegPoints
let noe = `{
    trafficRegistrationPoints: [
      {
        id: "21072V971737",
        name: "Ørje Svingbru",
        location: {
          county: {
            name: "Viken",
            number: 30,
          },
          municipality: {
            name: "Marker",
            number: 3013,
          },
        },
      }`


// jest.spyOn(global, 'fetch'); 
// beforeAll(() => jest.spyOn(global, 'fetch'))
// fetch = jest.fn();
// jest.mock('fetch')


// global.fetch = jest.fn(() => 
//     Promise.resolve({json: () => 
//         Promise.resolve(exampleTrafficRegPoints)
//     })
// );

// global.fetch.mockResolvedValue({
//     ok: true,
//     // json: async () => ({success: true}),
//     json: async () => exampleTrafficRegPoints
//   })


// this has to be above the `await import`s
// jest.unstable_mockModule("../components/fetchData.js", () => ({
//   fetchApi: jest.fn(() => exampleTrafficRegPoints),
//   // fetchApi: jest.fn(),
// }));

// jest.unstable_mockModule("../components/fetchData.js", () => {
//   return {
//     fetchApi: function () {
//       return {
//         isWorking: () => false,
//       };
//     },
//   };
// });

// describe('fetchApi.js', () => {
//     let resultat;

//     beforeEach(async () => {
//         resultat = await fetchApi('-c', trafficRegPoints, 'bergen', fromDateDefault, toDateDefault, 'jestTestFetchData.csv')
//     });

//     it('should get something', async () => {
//         // const resultat = await fetchApi('-c', trafficRegPoints, 'bergen', fromDateDefault, toDateDefault, 'jestTestFetchData.csv')
//         // expect(resultat).toEqual(noe);
//         // expect(global.fetch).toHaveBeenCalledTimes(1);
//         // expect(resultat).toHaveBeenCalledTimes(1);
//         expect(resultat.data.trafficRegistrationPoints[0].id).toEqual('21072V971737');
//         expect(fetch).toHaveBeenCalledTimes(1);
//         global.fetch.mockClear()
//     })
//   });



// const jestTest = await import("../components/fetchData.js");
// const {fetchApi} = await import("../components/fetchData.js");

// describe("Min mock test", () => {
//   let result;
//   it("returns mocked value", async () => {
//     // result = await jestTest.fetchApi(noe)
//     result = await fetchApi('-c', trafficRegPoints, 'bergen', fromDateDefault, toDateDefault, 'jestTestFetchData.csv')
//     // console.log("in test, execSync returns", execSync("ls"));
//     expect(result).toBe(exampleTrafficRegPoints);
//     // expect(result.isWorking()).toBe(false);
//     fetchApi.mockClear()
//   });
// });


// this has to be above the `await import`s
jest.unstable_mockModule("node:child_process", () => ({
  execSync: jest.fn(() => "some-mocked-value"),
}));


const { execSync } = await import("node:child_process");
// const fetchData = await import("../components/fetchData.js");
// import fetchData from '../components/fetchData.js';

describe("execsync test", () => {
  it("returns mocked value", () => {
    console.log("in test, execSync returns", execSync("ls"));
    // resultat = fetchData.default('ls');
    resultat = jestTest('ls');
    expect(resultat).toBe("some-mocked-value");
    console.log({execSync});
  });
  execSync.mockClear();
});



const jsonObj = JSON.parse(exampleTrafficRegPoints);

// this has to be above the `await import`s
// jest.unstable_mockModule("../components/fetchData.js", () => ({
//   fetchApi: jest.fn(() =>  
//     Promise.resolve({
//       // json: () => Promise.resolve({ test1: { test2: 123456 }}),
//       json: () => Promise.resolve(exampleTrafficRegPoints),
//     })    
//   ),
// }));


jest.unstable_mockModule("../components/fetchData.js", () => ({
  fetchApi: jest.fn(() =>  
    Promise.resolve(exampleTrafficRegPoints)    
  ),
}));

// const fetchApi = await import("../components/fetchData.js");
let {fetchApi} = await import("../components/fetchData.js");

it('should test fetch', async () => {
  const result = await fetchApi('-m', trafficRegPoints, 'bergen', fromDateDefault, toDateDefault, 'jestTestFetchData.csv');

  expect(result).toContain("46633V805290");
  expect(fetchApi).toHaveBeenCalledTimes(1);
  fetchApi.mockClear();
})

// fetchApi.mockClear();

// jest.unstable_mockModule("../components/fetchData.js", () => ({
//   fetchApi: jest.fn().mockReturnValue(Promise.reject('error')),
// }));

// describe('Testing Promise reject', () => {
//   it('should test if exception returns null', async () => {

//     fetchApi.mockImplementationOnce(() => Promise.reject('Api feiler'));
//     // fetchApi.mockRejectedValue(() => Promise.reject('Api feiler'));
//       // fetchApi.mockRejectedValueOnce(() =>  Promise.reject('Api feiler'))
//     // const result = await fetchApi('-m', trafficRegPoints, 'bergen', fromDateDefault, toDateDefault, 'jestTestFetchData.csv');
//     const result = await fetchApi("bad_url");
//     expect(result).toEqual('Api feiler');
//     // expect(fetchApi).toHaveBeenCalledWith("https://www.vegvesen.no/trafikkdata/api/")
//   });
// });
