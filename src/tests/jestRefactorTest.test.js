import { returnRowData } from "../components/testActualRefactor.js";

let exampleData = [["74808V805815","Bønesskogen nord","VEHICLE","Vestland","Bergen","60.331065","5.29924"],
["2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100","Bønes"],
["2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100","Bråtet"]];

let expectedOutput1 = ["74808V805815","Bønesskogen nord","VEHICLE","Vestland","Bergen","60.331065","5.29924"];

let expectedOutput2 = [
  ["74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924",
    "2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100",
    "Bønes",
  ],
  ["74808V805815,Bønesskogen nord,VEHICLE,Vestland,Bergen,60.331065,5.29924",
    "2023-02-25T00:00:00+01:00,2023-02-25T01:00:00+01:00,37,100",
    "Bråtet",
  ],
];

describe("testActualRefactor", () => {
  test("returnRowData", () => {
    let result = returnRowData(exampleData);
    let actual1 = result[1];
    let actual2 = result[0];

    expect(actual1).toStrictEqual(expectedOutput1);
    expect(actual2).toStrictEqual(expectedOutput2);
  });
});
