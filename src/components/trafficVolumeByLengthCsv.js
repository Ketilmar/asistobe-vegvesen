// TODO: - find a method to get the header keys more dynamicly
// TODO  - Method to define number of rows

import { FileWriter } from "./fileWriter.js";
import fs from 'fs';

/** Parses data object from 'trafficData', query and converts then sends object to FileWriter() */
const TrafficVolumeByLengthCsv = (data) => {
    // console.log(JSON.stringify(data, null, 4));

    // Counts the actual 'byLengthRange' collumns with data
    let collumnCounter = 0
    /** takes an object input and iterates thru. Collects values in rowItems variable */
    const getValues = (data) => {
        if(typeof data !== 'object'){
            return [data]
        }

        if (data === null){return ''}

        if (Object.keys(data).includes('byLengthRange')){
          console.log(data.byLengthRange.length);
            collumnCounter = data.byLengthRange.length
        };

        return Object.values(data).flatMap(v => getValues(v))
      }

      const rowItems = getValues(data)

      // extract repeating row data (id, name, county, municipality, lat, lon)
      let idInfo = rowItems.splice(0,6)

      // this will split the array of values into their respective arrays (collumns) per ID
      let numCol = collumnCounter + 4 //Add 4 to include 
      let rows = [];
      for (let i = 0; i < rowItems.length; i += numCol) {
          rows.push(idInfo + ',' + rowItems.slice(i, i + numCol));
          console.log({rows});
      }
      
      // if file exists, replace header object with empty array for new rows
      const path = "trafficVolumeByLength.csv"
      if (fs.existsSync(path)){
        const csv = [[], ...rows ].join('\r\n');
        FileWriter(path, csv,'ID ' +rowItems[0] + ' - Write row without header');
      }
      else {
        // Headers must be defined manually
        let manualHeaders = ['id','name','county','municipality', 'lat','lon','From', 'To', 'total-volume','Total-coverage', 'byLengthRange:..-5.6', 'byLengthRange:5.6-..','byLengthRange:5.6-7.6','byLengthRange:7.6-12.5','byLengthRange:12.5-16','byLengthRange:16-24','byLengthRange:24-..']

        // join header and body, and break into separate rows
        const csv = [manualHeaders, ...rows].join('\r\n');

        FileWriter(path, csv, 'ID ' +rowItems[0] + ' - write row with header');
      }
}

export {TrafficVolumeByLengthCsv}