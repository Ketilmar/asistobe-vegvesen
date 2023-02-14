import { FileWriter } from "./fileWriter.js";
import fs from 'fs';


const outerFunc = (data) => {

  const tmpRowData = new Array();
  const rowData = new Array();

  /** Iterates thru the input object one level each loop and extract all values. Pushes values to rowData as an array of arrays. Values stored as string */
  const getValues = (data) => {
    
    // If not an object, get the value and push it to tmpRowData array
    if(typeof data !== 'object'){
      tmpRowData.push(data.toString().replace(/[\,]+/g, ' -'))
      return;
    }

    // Handles empty data
    if (data === null){return};

    // Handles objects with no 'edge' data
    if (Object.keys(data).includes('edges')){
      if (data.edges.length === 0){
        rowData.push(tmpRowData.splice(0,7));
        rowData.push(['No data'])
      }
    }
    
    // when loop gets to 'byLengthRange', it takes the data collected in tmpRowData and stores it in rowData as an array
    // updates rowData array with 'idInfo' at index 0, then volume data for each time range in their respective index
    // First loop contains 'idInfo' data, so we account for that with '+ 7'. (could maybe use a high 'deleteCount' number instead of using 'byLengthRange' length)
    if (Object.keys(data).includes('byLengthRange')){
        rowData.push(tmpRowData.splice(0, data.byLengthRange.length + 7));
    };

    // each loop it takes the data object and flattens it to a new array. Then send the new array thru getValues() again. 
    Object.values(data).flatMap(v => getValues(v));

    // the last node (time period) must be pushed here not to loose it.
    // Checking for content in tmpRowData to avoid pushing empty arrays (mostly for 'no edge' data)
    if (Object.keys(data).includes('data')){
      if(tmpRowData.length !== 0){
        rowData.push(tmpRowData.splice(0, tmpRowData.length))
      }
    };
    
    return rowData;
  };

return getValues(data);
};


/** Parses data object from 'trafficVolumeByLength' query. Converts to csv and sends object to FileWriter() */
const TrafficVolumeByLengthCsv = (data, callback) => {
  let returnedRowData;

  returnedRowData = outerFunc(data);

  // extract data for adding to each row later (id, name, county, municipality, lat, lon)
  let idInfo = returnedRowData.shift();

  // put in 'idInfo' in each row
  for (let item in returnedRowData){
    returnedRowData[item].unshift(idInfo.toString());
  };

  // if file exists (and thus header too), replace header object with empty array for new rows
  const path = "trafficVolumeByLength.csv"
  if (fs.existsSync(path)){
    let csv = [[], ...returnedRowData ].join('\r\n');
    FileWriter(path, csv,'ID ' + idInfo[0] + ' - Write row without header -->');
    // tmpRowData.length = 0;
    // rowData.length = 0;
  }
  else {
    // Headers must be defined manually
    let manualHeaders = ['id','name','trafficRegistrationType','county','municipality', 'lat','lon','From', 'To', 'total-volume','Total-coverage', 'LengthRange:..-5.6', 'LengthRange:5.6-..','LengthRange:5.6-7.6','LengthRange:7.6-12.5','LengthRange:12.5-16','LengthRange:16-24','LengthRange:24-..']

    // join header and body, and break into separate rows
    let csv = [manualHeaders, ...returnedRowData].join('\r\n');

    // callback(csv.length )
    FileWriter(path, csv, 'ID ' + idInfo[0] + ' - Write row with header -->');
    // tmpRowData.length = 0;
    // rowData.length = 0;
  };
};

export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

export {TrafficVolumeByLengthCsv, outerFunc};