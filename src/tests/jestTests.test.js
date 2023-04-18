import { trafficVolumeByLength } from "../components/queries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js"; // dependent on utc plugin
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { getTimezones } from "../components/getTimezones";
import { getDefaultDates } from "../components/getDefaultDates"

describe("Date tests", () => {
  test("dayjs", () => {
    //set up dayjs
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    let testFromDate = "2023-01-01";
    let testToDate = "2023-04-01";

    let parsedDate = dayjs("2021-01-01", "YYYY-MM-DD").isValid(); // strict parsing
    let wrongFormat = dayjs("01-01-2021", "YYYY-MM-DD").isValid()
    let actual1 = dayjs.tz(`${testFromDate} 00:00`, "Europe/Oslo").format();
    let actual2 = dayjs.tz(`${testToDate} 00:00`, "Europe/Oslo").format();
    let expectedOutput1 = "2023-01-01T00:00:00+01:00"
    let expectedOutput2 = "2023-04-01T00:00:00+02:00"

    
    expect(parsedDate).toBeTruthy();
    expect(wrongFormat).toBeFalsy();
    expect(actual1).toBe(expectedOutput1);
    expect(actual2).toBe(expectedOutput2);
  });

  test("getDefaultDates", () => {
    let regEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    let actual = getDefaultDates(2)
    
    expect(actual).toMatch(regEx)
  })

  test("getTimezones", () => {
    let testFromDate = "2023-01-01";
    let testToDate = "2023-04-01";

    let actual = getTimezones(testFromDate, testToDate);
    let expectedOutput1 = "2023-01-01T00:00:00+01:00";
    let expectedOutput2 = "2023-04-01T00:00:00+02:00";

    expect(actual[0]).toBe(expectedOutput1);
    expect(actual[1]).toBe(expectedOutput2);
  });
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
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }`;

  expect(actual).toContain(expectedOutput1);
  expect(actual).toContain(expectedOutput2);
  expect(actual).toMatch(queryObj);
});
