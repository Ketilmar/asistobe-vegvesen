import {FileWriter} from "./fileWriter.js";

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

    const header1 = Object.keys(items.data.trafficRegistrationPoints[0]);
    const header2 = Object.keys(items.data.trafficRegistrationPoints[0].location.county.name);
    const header3 = Object.keys(items.data.trafficRegistrationPoints[0].location.county.number);
    console.log({header1});
    console.log({header2});
  
    // const headerString = header2.join(',');
    const headerTest = header1.concat(header1, header2);
    const headerString = headerTest.join(',');
    console.log({headerTest} );
  
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    const rowItems = items.data.trafficRegistrationPoints.map((row) =>
      header2
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
  
    FileWriter(csv);
    return csv;
  }
  
//   const csv = jsonToCsv(obj);
  
  

  export {jsonToCsv}