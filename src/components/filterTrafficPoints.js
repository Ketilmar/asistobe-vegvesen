// This function filters the traffic points based on the municipality name provided
const filterByMunicipality = (trafficPoints, municipality) => {
    const { trafficRegistrationPoints } = trafficPoints;

    const filteredTrafficPoints = trafficRegistrationPoints.filter((trafficPoint) => {
        const { name } = trafficPoint.location.municipality;
        if (name.toLowerCase() === municipality) {
            return true;
        } else return false;
    });
    console.log(filteredTrafficPoints);
};

// This function filters the traffic points based on the county name provided
const filterByCounty = (trafficPoints, county) => {
    const { trafficRegistrationPoints } = trafficPoints;

    const filteredTrafficPoints = trafficRegistrationPoints.filter((trafficPoint) => {
        const { name } = trafficPoint.location.county;
        if (name.toLowerCase() === county) {
            return true;
        } else return false;
    });
    console.log(filteredTrafficPoints);
};

// Function with a switch to determine which function to run
const filterTrafficPoints = (fetchType, name, trafficPoints) => {
    switch (fetchType) {
        case "-m":
            filterByMunicipality(trafficPoints, name);
            break;
        case "-c":
            filterByCounty(trafficPoints, name);
            break;
        default:
            // If wrong inputs console log which inputs are correct
            console.log("Please use -m 'municipality' or -c 'county'");
    }
};

export default filterTrafficPoints;
