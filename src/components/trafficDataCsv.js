import { FileWriter } from "./fileWriter.js";
import fs from 'fs'

/** Parses data object from 'trafficData' query and converts and write to csv file */
const TrafficDataCsv = (data) => {
    // console.log(JSON.stringify(data, null, 4));

    let i = 0;
    let headers = [];

    /** takes an object input and iterates thru it to get all the values */
    const getValues = (data) => {
        if(typeof data !== 'object'){
            // Number of tics gives the number of rows
            // console.log('TIKK', i++, typeof data, data);
            return [data]
        }

        if (data === null){return ''}
        headers.push(Object.keys(data));
        return Object.values(data).flatMap(v => getValues(v))
      }
      
      const rowItems = getValues(data)
  
      // define number of rows.
      // this will split the array of values into their respective arrays
      let numRows = 41;
      let rows = [];
      for (let i = 0; i < rowItems.length; i += numRows) {
          rows.push(rowItems.slice(i, i + numRows));
      }
  
      // Checks if file exists
      const ReadFile = (path) => fs.existsSync(path, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File exists");
        }
      });


      // if file exists, replace header with empty array for new rows
      if (ReadFile("trafficdata.csv")){
        const csv = [[], ...rows].join('\r\n');
        FileWriter(csv);
      }
      else {
        // Headers must be defined manually
        let manualHeaders = ['id','name','county','municipality', 'lat','lon','from', 'to', 'total', 'total-volume','Total-coverage', 'lengthRange-lowerBound', 'lengthRange-upperBound', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22']
        
        // join header and body, and break into separate rows
        const csv = [manualHeaders, ...rows].join('\r\n');
        
        FileWriter(csv);
      }
}

export {TrafficDataCsv}