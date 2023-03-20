// pushes node data to rowData array
// Excluding empty tempNodeData to avoid pushing empty arrays.
const nodePusher = (tempNodeData, nodeData, rowdata) =>{
  if (tempNodeData.length !== 0){
    nodeData.push(tempNodeData.splice(0, tempNodeData.length));

    let timeRange = nodeData.shift();

    // put timerange in front of each row
    for (let item of nodeData){
        item.unshift(timeRange.toString());
        rowdata.push(item.splice(0, item.length));
    };

    nodeData.splice(0, nodeData.length);
  };
};

const tempNodeData = new Array();
const rowData = new Array();
const nodeData = new Array();
let resultVar;

  /** Iterates thru the input object and extract all values. Pushes values to rowData as arrays of strings */
const objectPeeler = (data) => {
  

  // If not an object, get the value and push it to tempNodeData array
  if(typeof data !== 'object'){
    tempNodeData.push(data.toString().replace(/[\,]+/g, ' -'));
    return;
  }

  if (data === null){
    tempNodeData.push('null');
    return;
  } 

  // Handles objects with no 'edge' data
  if (Object.keys(data).includes('edges')){
    if (data.edges.length === 0){
      rowData.push(tempNodeData.splice(0,tempNodeData.length));
      rowData.push(['No data']);
    };
  };

  // This where id row is pushed, thats common for all rows
  if (Object.keys(data).includes('edges')){
    rowData.push(tempNodeData.splice(0, tempNodeData.length));
  };

  if (Object.keys(data).includes('node')){
    nodePusher(tempNodeData, nodeData, rowData);
  };

  // this where timerange and total for that is pushed
  if (Object.keys(data).includes('heading')){
    nodeData.push(tempNodeData.splice(0, tempNodeData.length));
  };
    
  // each loop it takes the data object and flattens it to a new array. Sends the new array thru objectPeeler() again. 
  Object.values(data).flatMap(v => objectPeeler(v));

  // the last node (timerange) must be pushed here not to loose it.
  if (Object.keys(data).includes('data')){
    nodePusher(tempNodeData, nodeData, rowData);
    resultVar = rowData.splice(0, rowData.length)
  };
  
  return resultVar;
};

export {objectPeeler}