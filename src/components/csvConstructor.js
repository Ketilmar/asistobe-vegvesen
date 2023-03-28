import { FileWriter } from "./fileWriter.js";
import fs from "fs";
import { objectPeeler } from "./objectPeeler.js";

/** Parses data object from 'trafficVolumeByLength' query. Converts to csv and sends object to csvWriter() */
const csvConstructor = (data, path) => {
  let returnedRowData = objectPeeler(data);

  csvWriter(returnRowData(returnedRowData), path);
};

/** Extracts data for adding to each row (id, name, county, municipality, lat, lon) */
const returnRowData = (returnedRowData) => {
  let idInfo = returnedRowData.shift();

  returnedRowData.map(item => {
    item.unshift(idInfo.toString())
  })

  return [returnedRowData, idInfo];
};

/** Creates or updates existing file with headers */
const csvWriter = (returnedRowData, path) => {
  // if file exists (and thus header too), replace header object with empty array for new rows
  if (fs.existsSync(path)) {
    let csv = [[], ...returnedRowData[0]].join("\r\n");
    FileWriter(
      path,
      csv,
      `ID ${returnedRowData[1]} - Write row without header -->`
    );
  } else {
    // Headers must be defined manually
    let manualHeaders = [
      "id",
      "name",
      "trafficRegistrationType",
      "county",
      "municipality",
      "lat",
      "lon",
      "From",
      "To",
      "total-volume",
      "Total-coverage",
      "Heading",
      "Total",
      "LengthRange:..-5.6",
      "LengthRange:5.6-..",
      "LengthRange:5.6-7.6",
      "LengthRange:7.6-12.5",
      "LengthRange:12.5-16",
      "LengthRange:16-24",
      "LengthRange:24-..",
    ];
    // join header and body, and break into separate rows
    let csv = [manualHeaders, ...returnedRowData[0]].join("\r\n");
    FileWriter(
      path,
      csv,
      `ID ${returnedRowData[1]} - Write row with header -->`
    );
  }
};

export { csvConstructor, returnRowData };