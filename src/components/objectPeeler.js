// pushes node data to rowData array
// Excluding empty tempNodeData to avoid pushing empty arrays.
const nodePusher = (tempNodeData, nodeData, rowdata) =>{
  if (tempNodeData.length !== 0){
    nodeData.push(tempNodeData.splice(0, tempNodeData.length));

    let timeRange = nodeData.shift();

    nodeData.map((item) => {
      item.unshift(timeRange.toString());
      rowdata.push(item);
    });

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

  if (Object.keys(data).includes('node')){
    nodePusher(tempNodeData, nodeData, rowData);
  };

  // this where timerange and total for that is pushed
  if (Object.keys(data).includes('heading')){
    nodeData.push(tempNodeData.splice(0, tempNodeData.length));
  };
    
  // each loop it takes the data object and flattens it to a new array. Sends the new array thru objectPeeler() again. 
  Object.values(data).flatMap(v => objectPeeler(v));

  // This where id row is pushed
  if (Object.keys(data).includes('id') && Object.keys(data).includes('trafficRegistrationType')){
    rowData.push(tempNodeData.splice(0, tempNodeData.length));
  };

  // the last node (timerange) must be pushed here not to loose it.
  if (Object.keys(data).includes('data')){
    nodePusher(tempNodeData, nodeData, rowData);
    resultVar = rowData.splice(0, rowData.length)
  };
  
  return resultVar;
};

export {objectPeeler}