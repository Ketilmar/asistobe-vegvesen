

const RegpointDataCsv = (data) => {

    console.table(data);
    // TEST: how to get csv headers
    
    const header1 = (Object.keys(data.data.trafficData.trafficRegistrationPoint));
    // const header2 = (Object.keys(data.data.trafficData.volume));
    // const header3 = (Object.keys(data.data.trafficData.volume.byHour.edges[10].node));
    // const header4 = (Object.keys(data.data.trafficData.volume.byHour.edges[10].node.total));
    //const header5 = (Object.keys(data.data.trafficData.volume.byHour.edges[10].node.byLengthRange[0].lengthRange));
    const header6 = (Object.keys(data.data.trafficData.trafficRegistrationPoint.location.coordinates.latLon));
    const pathToEdges = data.data.trafficData.volume.byHour.edges

    const edgeData = (arr = []) => {
        const result = arr.reduce((acc, obj, index) => {
        acc.push(obj.node);
        acc.push(obj.node.total);
        acc.push(obj.node.byLengthRange[index]);
        return acc;
     }, []);
        return result;
    };

    const headerEdges = (Object.keys(edgeData(pathToEdges)))


    // combine all the headers
    //const header = header1.concat(header3, header4, header5)
    
    console.table(data.data.trafficData.trafficRegistrationPoint);
    console.table(edgeData(pathToEdges))
    //console.table(data.data.trafficData.volume.byHour.edges[10].node);
    //console.table(data.data.trafficData.volume.byHour.edges[10].node.total);
    //console.table(data.data.trafficData.volume.byHour.edges[10].node.byLengthRange[0].lengthRange);
    console.table(data.data.trafficData.trafficRegistrationPoint.location.coordinates.latLon);
}

export {RegpointDataCsv}