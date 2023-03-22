import moment from "moment/moment";
import { inputCheck } from "../components/fetchData";
import { trafficVolumeByLength } from "../components/queries";

describe("Date number tests", () => {
  test("Date inputs", () => {
    // arrange and act
    let opposite = inputCheck("10-11-2022", "11-11-2022")
    let incomplete = inputCheck("2022-11", "2022-11-10")
    let emptyStringWithSpace = inputCheck(" ", " ")
    let empty = inputCheck("", "")
    let inputTest = inputCheck("2022-12-30", "2022-02-06");
    let testFail = inputCheck("2022-13-30", "2022-05-05");
    let testFormat = inputCheck("2022.12.30", "2022.12.31");
    let testDate = "2022-02-05";
    let dateTest = moment().subtract(1, "days").format("YYYY-MM-DD");
    let regEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    //assert
    expect(opposite).toBeFalsy()
    expect(incomplete).toBeFalsy()
    expect(emptyStringWithSpace).toBeFalsy()
    expect(empty).toBeFalsy()
    expect(inputTest).not.toBeFalsy();
    expect(testFail).toBeFalsy();
    expect(testFormat).toBeFalsy();
    expect(testDate).toMatch(regEx);
    expect(dateTest).toMatch(regEx);
  });
});

test("Query function", () => {
  let params = ["4534V453453B", "2023-02-05", "2023-02-06"];
  const actual = trafficVolumeByLength(params[0], params[1], params[2]);

  let expectedOutput1 = `{trafficData(trafficRegistrationPointId: "4534V453453B") {`;
  let expectedOutput2 = `byHour(from: "2023-02-05T00:00:00+01:00", to: "2023-02-06T00:00:00+01:00") {`;

  const queryObj = `{trafficData(trafficRegistrationPointId: "4534V453453B") {
      trafficRegistrationPoint {
        id
        name
        trafficRegistrationType
        location {
          county {
            name
          }
          municipality {
            name
          }
          coordinates {
            latLon {
              lat
              lon
            }
          }
        }
      }
      volume {
        byHour(from: "2023-02-05T00:00:00+01:00", to: "2023-02-06T00:00:00+01:00") {
          edges {
            node {
              from
              to
              total {
                volumeNumbers {
                  volume
                }
                coverage {
                  percentage
                }
              }
              byDirection {
                heading
                total {
                  volumeNumbers {
                    volume
                  }
                }
                byLengthRange {
                  total {
                    volumeNumbers {
                      volume
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  expect(actual).toContain(expectedOutput1);
  expect(actual).toContain(expectedOutput2);
  expect(actual).toMatch(queryObj);
});
