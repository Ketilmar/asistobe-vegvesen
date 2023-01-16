import { FileWriter, FileDeleter } from "./fileWriter.js";
import fs from 'fs'

/** Parses the result from '-s' option and converts it to a flat csv object */
function SearchResultCsv(items) {
  
    /** takes an object input and iterates thru it to get all the values */
    const getValues = (data, values= []) => {
      if(typeof data !== 'object'){
        return [...values, data]
      }
      return Object.values(data).flatMap(v => getValues(v, values))
    }
    
    const rowItems = getValues(items)

    // define number of rows.
    // this will split the array of values into separate arrays
    let numRows = 12;
    let rows = [];
    for (let i = 0; i < rowItems.length; i += numRows) {
        rows.push(rowItems.slice(i, i + numRows));
    }

    // Headers must be defined manually
    let manualHeaders = ['id','name','trafficRegistrationType','county-name', 'county-number','municipality-name','municipality-number', 'roadReference-shortForm', 'roadCategory-id', 'roadCategory-name','lat','lon']
  
    // join header and body, and break into separate lines
    const csv = [manualHeaders, ...rows].join('\r\n');
    
    const path = "searchResult.csv"
    FileWriter('searchResult.csv', csv)
}
  
  export {SearchResultCsv}