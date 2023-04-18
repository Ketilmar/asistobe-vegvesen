import moment from "moment/moment";
import { inputCheck } from "../components/fetchData";
import { trafficVolumeByLength } from "../components/queries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"
import timezone from "dayjs/plugin/timezone.js" // dependent on utc plugin
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

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

  test("dayjs", () => {
    //set up dayjs
    dayjs.extend(customParseFormat)
    dayjs.extend(utc)
    dayjs.extend(timezone)

    let testFromDate = "2023-01-01"
    let testToDate = "2023-04-01"

    let testLeap = dayjs().subtract(1138, 'day').format("YYYY-MM-DD")
    let testMonths = dayjs().subtract(11, 'day').format("YYYY-MM-DD")
    let parsedDate = dayjs('2020-02-29', 'YYYY-MM-DD').isValid() // strict parsing
    let fromDate = dayjs().subtract(2, 'day').format("YYYY-MM-DD")
    let toDate = dayjs().subtract(1, 'day').format("YYYY-MM-DD")
    let timezoneCheck1 = dayjs.tz(`${testFromDate} 00:00`, "Europe/Oslo").format();
    let timezoneCheck2 = dayjs.tz(`${testToDate} 00:00`, "Europe/Oslo").format();

    expect(testLeap).toBe("2020-02-29")
    expect(testMonths).toBe("2023-04-01")
    expect(parsedDate).toBeTruthy()
    expect(fromDate).toMatch("2023-04-10")
    expect(toDate).toMatch("2023-04-11")
    expect(timezoneCheck1).toBe("2023-01-01T00:00:00+01:00")
    expect(timezoneCheck2).toBe("2023-04-01T00:00:00+02:00")
  })
});

test("Query function", () => {
  let params = ["4534V453453B", "2023-02-05T00:00:00+01:00", "2023-02-06T00:00:00+01:00", ""];
  const actual = trafficVolumeByLength(params[0], params[1], params[2], params[3]);

  let expectedOutput1 = `{trafficData(trafficRegistrationPointId: "4534V453453B") {`;
  let expectedOutput2 = `byHour(from: "2023-02-05T00:00:00+01:00", to: "2023-02-06T00:00:00+01:00", after: "") {`;

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
        byHour(from: "2023-02-05T00:00:00+01:00", to: "2023-02-06T00:00:00+01:00", after: "") {
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
