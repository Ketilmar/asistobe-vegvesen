// This function filters the traffic points based on the municipality name provided
const filterByMunicipality = (trafficPoints, municipality) => {
    console.log({trafficPoints, municipality});
    const { trafficRegistrationPoints } = trafficPoints.data;

    const filteredTrafficPoints = trafficRegistrationPoints.filter((trafficPoint) => {
        const { name } = trafficPoint.location.municipality;
        // console.log('TEMP: ',trafficPoint.location.municipality);
        if (name.toLowerCase() === municipality) {
            return true;
        } else return false;
    });

    console.log({filteredTrafficPoints} );
    return filteredTrafficPoints;
};

// This function filters the traffic points based on the county name provided
const filterByCounty = (trafficPoints, county) => {
    const trafficRegistrationPoints  = trafficPoints.data.areas.counties;

    console.log('areas: ',trafficPoints.data.areas);

    const filteredTrafficPoints = trafficRegistrationPoints.filter((trafficPoint) => {
        const { name } = trafficPoint.location.county;
        if (name.toLowerCase() === county) {
            return true;
        } else return false;
    });
    
    console.log({filteredTrafficPoints});
    return filteredTrafficPoints;
};

// Function with a switch to determine which function to run
const filterTrafficPoints = (fetchType, name, trafficPoints) => {
    // console.log({fetchType, name, trafficPoints});
    let filteredTrafficPoints = null;
    switch (fetchType) {
        case "-m":
            filteredTrafficPoints = filterByMunicipality(trafficPoints, name);
            break;

        case "-c":
            filteredTrafficPoints = filterByCounty(trafficPoints, name);
            break;

        default:
            // If wrong inputs console log which inputs are correct
            console.log("Please use -m <municipality> or -c <county>");
            break;
    }
    return filteredTrafficPoints;
};

export default filterTrafficPoints;