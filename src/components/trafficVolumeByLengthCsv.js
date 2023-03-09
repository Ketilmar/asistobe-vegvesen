import { FileWriter } from "./fileWriter.js";
import fs from 'fs';
import { objectPeeler } from "./objectPeeler.js";


/** Converts each array returned from objectPeeler to csv and sends to FileWriter() */
const TrafficVolumeByLengthCsv = (data, path) => {

  let returnedRowData = objectPeeler(data);

  // extract data for adding to each row later (id, name, county, municipality, lat, lon)
  let idInfo = returnedRowData.shift();
  jestCallback(idInfo)

  // put in 'idInfo' in each row
  for (let item in returnedRowData){
    returnedRowData[item].unshift(idInfo.toString());
  };
  jestCallback(returnedRowData[0])

  // if file exists (and thus header too), replace header object with empty array for new rows
  if (fs.existsSync(path)){
    let csv = [[], ...returnedRowData ].join('\r\n');
    jestCallback(csv)
    FileWriter(path, csv,`ID ${idInfo[0]} - Write row without header -->`);
  }
  else {
    // Headers must be defined manually
    let manualHeaders = ['id','name','trafficRegistrationType', 'county', 'municipality', 'lat','lon','From', 'To', 'total-volume','Total-coverage', 'Heading', 'Total', 'LengthRange:..-5.6', 'LengthRange:5.6-..','LengthRange:5.6-7.6','LengthRange:7.6-12.5','LengthRange:12.5-16','LengthRange:16-24','LengthRange:24-..']
    // join header and body, and break into separate rows
    let csv = [manualHeaders, ...returnedRowData].join('\r\n');
    jestCallback(csv)
    FileWriter(path, csv, `ID ${idInfo[0]} - Write row with header -->`);
  };
};

export {TrafficVolumeByLengthCsv};