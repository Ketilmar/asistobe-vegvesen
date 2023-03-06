import { FileWriter } from "./fileWriter.js";
import fs from 'fs';


const getValues = (data) => {

  const tmpRowData = new Array();
  const rowData = new Array();
  const rowData2 = new Array();

  /** Iterates thru the input object one level each loop and extract all values. Pushes values to rowData as an array of arrays. Values stored as string */
  const onionPeeler = (data) => {

    // If not an object, get the value and push it to tmpRowData array
    if(typeof data !== 'object'){
      tmpRowData.push(data.toString().replace(/[\,]+/g, ' -'))
      return;
    }

    if (data === null){
      tmpRowData.push('null');
      return;
    } 

    // Handles objects with no 'edge' data
    if (Object.keys(data).includes('edges')){
      if (data.edges.length === 0){
        rowData.push(tmpRowData.splice(0,tmpRowData.length));
        rowData.push(['No data']);
      };
    };

    // This where id row is pushed, thats common for all rows
    if (Object.keys(data).includes('edges')){
      rowData.push(tmpRowData.splice(0, tmpRowData.length));
    };

    if (Object.keys(data).includes('node')){
      if (tmpRowData.length !== 0){
        rowData2.push(tmpRowData.splice(0, tmpRowData.length));

       let timeRange = rowData2.shift();

        for (let item of rowData2){
          if (item.lenght !== 0){
            item.unshift(timeRange.toString());
            rowData.push(item.splice(0, item.length));
          };
        };

        for (let item in rowData2){
          rowData2.splice(0,item.length);
        };

        rowData2.splice(0,1);

      };
    };
    // this where timeslot and total for that is pushed
    if (Object.keys(data).includes('heading')){
      rowData2.push(tmpRowData.splice(0, tmpRowData.length));
    };
      
    // each loop it takes the data object and flattens it to a new array. Sends the new array thru getValues() again. 
    Object.values(data).flatMap(v => onionPeeler(v));

    // the last node (time period) must be pushed here not to loose it.
    // Excluding empty tmpRowData to avoid pushing empty arrays.
    if (Object.keys(data).includes('data')){
      if(tmpRowData.length !== 0){
        rowData2.push(tmpRowData.splice(0, tmpRowData.length))
      };

      let timeRange = rowData2.shift()

        for (let item of rowData2){
          if (item.lenght !== 0){
            item.unshift(timeRange.toString());
            rowData.push(item.splice(0, item.length));
          };
        };

        for (let item in rowData2){
          rowData2.splice(0,item.length);
        };
    };
    
    return rowData;
  };

return onionPeeler(data);
};


/** Parses data object from 'trafficVolumeByLength' query. Converts to csv and sends object to FileWriter() */
const TrafficVolumeByLengthCsv = (data, path, jestCallback = () => {}) => {

  let returnedRowData = getValues(data);

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

export {TrafficVolumeByLengthCsv, getValues};