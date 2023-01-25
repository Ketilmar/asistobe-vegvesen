// TODO: - find a method to get the header keys more dynamicly

import { FileWriter } from "./fileWriter.js";
import fs from 'fs';

/** Parses data object from 'trafficVolumeByLength' query. Converts to csv and sends object to FileWriter() */
const TrafficVolumeByLengthCsv = (data) => {
  // console.log(JSON.stringify(data, null, 4));

  // 'byLengthRange' counter
  let collumnCounter = 0;

  /** takes an object input and iterates thru. Collects all values in rowItems variable as a flat array. Values returned as string */
  const getValues = (data) => {
    if(typeof data !== 'object'){
      // Replace all commas within values, as comma is used to separate values in our csv. Replace with hyphen.
      return [data.toString().replace(/[\,]+/g, ' -')];
    }

    if (data === null){return ''};

    // here i count where 'byLengthRange' data is available. 
    // Read as: how many collunms of lengthRange is available in this timeRange
    // This is used to identify where to slice the 'rowItems' array into separate arrays (per timeRange)
    if (Object.keys(data).includes('byLengthRange')){
        collumnCounter = data.byLengthRange.length
    };

    return Object.values(data).flatMap(v => getValues(v));
  };

  const rowItems = getValues(data);

  // extract data for adding to each row later (id, name, county, municipality, lat, lon)
  let idInfo = rowItems.splice(0,6)

  let numCol = collumnCounter + 4 //Add 4 to include 
  let rows = [];
  // this will split the array of values into their respective arrays (rows) per timeRange
  for (let i = 0; i < rowItems.length; i += numCol) {
      rows.push(idInfo + ',' + rowItems.slice(i, i + numCol));
  };
  
  // if file exists (and thus header too), replace header object with empty array for new rows
  const path = "trafficVolumeByLength.csv"
  if (fs.existsSync(path)){
    const csv = [[], ...rows ].join('\r\n');
    FileWriter(path, csv,'ID ' +idInfo[0] + ' - Write row without header');
  }
  else {
    // Headers must be defined manually
    let manualHeaders = ['id','name','county','municipality', 'lat','lon','From', 'To', 'total-volume','Total-coverage', 'LengthRange:..-5.6', 'LengthRange:5.6-..','LengthRange:5.6-7.6','LengthRange:7.6-12.5','LengthRange:12.5-16','LengthRange:16-24','LengthRange:24-..']

    // join header and body, and break into separate rows
    const csv = [manualHeaders, ...rows].join('\r\n');

    FileWriter(path, csv, 'ID ' +idInfo[0] + ' - Write row with header');
  };
};

export {TrafficVolumeByLengthCsv}