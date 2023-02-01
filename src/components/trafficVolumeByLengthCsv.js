import { FileWriter } from "./fileWriter.js";
import fs from 'fs';

/** Parses data object from 'trafficVolumeByLength' query. Converts to csv and sends object to FileWriter() */
const TrafficVolumeByLengthCsv = (data) => {
  // console.log(JSON.stringify(data, null, 4));

  let tmpRowData = [];
  let rowData = [];

  /** Iterates thru the input object and extract all values. Pushes values to rowData as an array of arrays. Values stored as string */
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
        rowData.push(['Contains no data'])
      }
    }
    
    // when loop gets to 'byLengthRange', it takes the data collected in tmpRowData and stores it in rowData as an array
    // updates rowData array with 'idInfo' at index 0, then volume data for each time range in their respective index
    // First loop contains 'idInfo' data, so we account for that with '+ 6'. (could maybe use a high 'deleteCount' number instead of using 'byLengthRange' length)
    if (Object.keys(data).includes('byLengthRange')){
        rowData.push(tmpRowData.splice(0, data.byLengthRange.length + 7));
    };

    // each loop it takes the data object and flattens it to a new array. Then send the new array thru getValues() again. 
    Object.values(data).flatMap(v => getValues(v));
  };

  getValues(data);

  // extract data for adding to each row later (id, name, county, municipality, lat, lon)
  let idInfo = rowData.shift();
  // console.log({idInfo});

  // put in 'idInfo' in each row
  for (let item in rowData){
    rowData[item].unshift(idInfo.toString())
  };

  // if file exists (and thus header too), replace header object with empty array for new rows
  const path = "trafficVolumeByLength.csv"
  if (fs.existsSync(path)){
    const csv = [[], ...rowData ].join('\r\n');
    FileWriter(path, csv,'ID ' + idInfo[0] + ' - Write row without header -->');
  }
  else {
    // Headers must be defined manually
    let manualHeaders = ['id','name','trafficRegistrationType','county','municipality', 'lat','lon','From', 'To', 'total-volume','Total-coverage', 'LengthRange:..-5.6', 'LengthRange:5.6-..','LengthRange:5.6-7.6','LengthRange:7.6-12.5','LengthRange:12.5-16','LengthRange:16-24','LengthRange:24-..']

    // join header and body, and break into separate rows
    const csv = [manualHeaders, ...rowData].join('\r\n');

    FileWriter(path, csv, 'ID ' + idInfo[0] + ' - Write row with header -->');
  };
};

export {TrafficVolumeByLengthCsv}