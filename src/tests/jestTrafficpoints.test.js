import {
    filterByCounty,
    filterByMunicipality,
    getAll,
  } from "../components/filterTrafficPoints";

const testData = `{
    "data": {
      "trafficRegistrationPoints": [
  {
    "id": "06872V2518838",
    "name": "Rampe Loddefjord - Bergen",
    "location": {
      "county": {
        "name": "Vestland",
        "number": 46
      },
      "municipality": {
        "name": "Bergen",
        "number": 4601
      }
    }
  },
  {
    "id": "57587V805035",
    "name": "STORAVATN, RAMPE FRA BERGEN",
    "location": {
      "county": {
        "name": "Vestland",
        "number": 46
      },
      "municipality": {
        "name": "Bergen",
        "number": 4601
      }
    }
  },
  {
    "id": "32259V22202",
    "name": "BERGENDAL VEST",
    "location": {
      "county": {
        "name": "Agder",
        "number": 42
      },
      "municipality": {
        "name": "Tvedestrand",
        "number": 4213
      }
    }
  }
  ]
  }
  }`;
  
  let result1 = `
  {
  "id": "06872V2518838",
  "name": "Rampe Loddefjord - Bergen",
  "location": {
  "county": {
    "name": "Vestland",
    "number": 46
  },
  "municipality": {
    "name": "Bergen",
    "number": 4601
  }
  }
  }`;
  
  let result2 = `
  {
  "id": "57587V805035",
  "name": "STORAVATN, RAMPE FRA BERGEN",
  "location": {
  "county": {
    "name": "Vestland",
    "number": 46
  },
  "municipality": {
    "name": "Bergen",
    "number": 4601
  }
  }
  }`;
  
  let result3 = `
  {
    "id": "32259V22202",
    "name": "BERGENDAL VEST",
    "location": {
      "county": {
        "name": "Agder",
        "number": 42
      },
      "municipality": {
        "name": "Tvedestrand",
        "number": 4213
      }
    }
  }`
  
  let jsonObj = JSON.parse(testData);
  let jsonResult1 = JSON.parse(result1);
  let jsonResult2 = JSON.parse(result2);
  let jsonResult3 = JSON.parse(result3);
  
  describe("FilterTrafficPoints functions", () => {
    test("municipality", () => {
      let muniTest = filterByMunicipality("bergen", jsonObj);
      
      expect(muniTest).toEqual(expect.arrayContaining([jsonResult1]));
      expect(muniTest).toEqual(expect.arrayContaining([jsonResult2]));
      expect(muniTest).not.toEqual(expect.arrayContaining([jsonResult3]));
  
      expect(muniTest).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "06872V2518838" })])
      );
      expect(muniTest).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "57587V805035" })])
      );
      expect(muniTest).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "32259V22202" })])
      );
    });
  
    test("county", () => {    
      let countyTest = filterByCounty("vestland", jsonObj);
      
      expect(countyTest).toEqual(expect.arrayContaining([jsonResult1]));
      expect(countyTest).toEqual(expect.arrayContaining([jsonResult2]));
      expect(countyTest).not.toEqual(expect.arrayContaining([jsonResult3]));
  
      expect(countyTest).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "06872V2518838" })])
      );
      expect(countyTest).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "57587V805035" })])
      );
      expect(countyTest).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "32259V22202" })])
      );
    });
  
    test("getAll", () => {
      let getAllTest = getAll(jsonObj)
  
      expect(getAllTest).toEqual(expect.arrayContaining([jsonResult1]));
      expect(getAllTest).toEqual(expect.arrayContaining([jsonResult2]));
      expect(getAllTest).toEqual(expect.arrayContaining([jsonResult3]));
  
      expect(getAllTest).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "06872V2518838" })])
      );
      expect(getAllTest).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "57587V805035" })])
      );
      expect(getAllTest).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: "32259V22202" })])
      );
  
    })
  });