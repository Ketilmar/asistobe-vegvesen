const tmpRowData = new Array();
const rowData = new Array();
const rowData2 = new Array();

  /** Iterates thru the input object and extract all values. Pushes values to rowData as array. Values stored as string */
  const objectPeeler = (data) => {
    

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
          // if (item){
            item.unshift(timeRange.toString());
            rowData.push(item.splice(0, item.length));
          // };
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
    Object.values(data).flatMap(v => objectPeeler(v));

    // the last node (time period) must be pushed here not to loose it.
    // Excluding empty tmpRowData to avoid pushing empty arrays.
    if (Object.keys(data).includes('data')){
      if(tmpRowData.length !== 0){
        rowData2.push(tmpRowData.splice(0, tmpRowData.length))
      };

      let timeRange = rowData2.shift()

        for (let item of rowData2){
          // if (item){
            item.unshift(timeRange.toString());
            rowData.push(item.splice(0, item.length));
          // };
        };

        for (let item in rowData2){
          rowData2.splice(0,item.length);
        };
    };
    
    return rowData;
  };

  export {objectPeeler}