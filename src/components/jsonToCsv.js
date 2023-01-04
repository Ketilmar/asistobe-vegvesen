

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

    const header = Object.keys(items.data.trafficRegistrationPoints[0]);
    console.log({header});
  
    const headerString = header.join(',');
  
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    const rowItems = items.data.trafficRegistrationPoints.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
  
    // console.log({csv});
    return csv;
  }
  
//   const csv = jsonToCsv(obj);
  
  

  export {jsonToCsv}