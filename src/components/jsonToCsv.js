//###############################################################
// This file is no longer in use. I just keep it for reference ##
//###############################################################

import { FileWriter } from "./fileWriter.js";

function jsonToCsv(items) {
        
    console.log({items});

    const cleanedData = items.data.trafficRegistrationPoints.map((item) => ({
        Name: item.name,
        // Number: item.location.roadReference.shortForm,
        id: item.id,
      }));
    console.log(cleanedData);

    console.log(Object.getOwnPropertyNames(items.data.trafficRegistrationPoints[0]));
    
    // console.log(JSON.stringify(items, null, 4));

    // const header = Object.keys(items.data.trafficRegistrationPoints[0]);
    const header1 = Object.keys(items.data.trafficRegistrationPoints[0]);
    let header2 = [];
    for (let i in items.data.trafficRegistrationPoints[0].location){header2.push(i)};
    // const header3 = items.data.trafficRegistrationPoints[0].location.county.name;
    // const header4 = items.data.trafficRegistrationPoints[0].location.county.number;
    
    console.log({header2});
    // const headerString = header.join(',');

    // joins the two header arrays
    const headerString = header1.concat(header2);

    // removes unwanted header
    headerString.splice(headerString.indexOf('location'),1)
    console.log({headerString});

    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    // const rowItems = items.data.trafficRegistrationPoints.map((row) =>
    //   headerString
    //     .map((fieldName) => JSON.stringify(row[fieldName], replacer))
    //     .join(',')
    // );

    // const rowItems = items.data.trafficRegistrationPoints.map((row) =>
    //   header1
    //     .map((fieldName) => JSON.stringify(row[fieldName], replacer))
    //     // .map((fieldName) => console.log(row))
    //     .join(',')
    // );

    let rowItems2 = [];
    // for (let i in items.data.trafficRegistrationPoints[0].location) {
    //   console.log(items.data.trafficRegistrationPoints[0].location);
    //   // JSON.stringify(rowItems2[i], replacer)
    //   for (let item in items.data.trafficRegistrationPoints[0].location[i]){
    //   rowItems2.push(items.data.trafficRegistrationPoints[0].location[i])
    //   }
    // }

    const getValues = (data, values= []) => {
      if(typeof data !== 'object'){
        return [...values, data]
      }
      return Object.values(data).flatMap(v => getValues(v, values))
    }
    
    console.log(getValues(items.data.trafficRegistrationPoints[0]))
    const rowItems = getValues(items)

    console.log({rowItems});
    console.log({rowItems2});
  
    // join header and body, and break into separate lines
    // const csv = [headerString, ...rowItems].join('\r\n');
    const csv = [headerString, ...rowItems].join('\r\n');
  
    FileWriter(csv);
    
    return csv;
  }
  
  // export {jsonToCsv}