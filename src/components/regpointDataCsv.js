

const RegpointDataCsv = (data) => {

    console.table(data);
    // TEST: how to get csv headers
    const header1 = (Object.keys(data.data.trafficData.trafficRegistrationPoint));
    // const header2 = (Object.keys(data.data.trafficData.volume));
    const header3 = (Object.keys(data.data.trafficData.volume.byHour.edges[0].node));
    const header4 = (Object.keys(data.data.trafficData.volume.byHour.edges[0].node.total));
    const header5 = (Object.keys(data.data.trafficData.volume.byHour.edges[0].node.byLengthRange[0].lengthRange));

    // combine all the headers
    const header = header1.concat(header3, header4, header5)
    
    console.table(data.data.trafficData.trafficRegistrationPoint);
    console.table(data.data.trafficData.volume.byHour.edges[0].node);
    console.table(data.data.trafficData.volume.byHour.edges[0].node.total);
    console.table(data.data.trafficData.volume.byHour.edges[0].node.byLengthRange[0].lengthRange);
}

export {RegpointDataCsv}