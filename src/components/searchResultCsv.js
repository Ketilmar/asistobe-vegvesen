import { FileWriter } from "./fileWriter.js";
import { objectPeeler } from "./objectPeeler.js";

/** Parses the result from '-s' option and converts it to a flat csv object */
function SearchResultCsv(data, path) {
    
    const returnData = objectPeeler(data)

    // Headers must be defined manually
    const manualHeaders = ['id','name','trafficRegistrationType','county-name', 'county-number','municipality-name','municipality-number', 'roadReference-shortForm', 'roadCategory-id', 'roadCategory-name','lat','lon']
  
    // join header and body, and break into separate lines
    const csv = [manualHeaders, ...returnData].join('\r\n');
    
    FileWriter(path, csv, 'Search result successfull.');
};
  
  export {SearchResultCsv}