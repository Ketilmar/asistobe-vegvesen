import { FetchData } from "./fetchData.js";

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

    return filteredTrafficPoints;
};

// This function filters the traffic points based on the county name provided
const filterByCounty = (trafficPoints, county) => {
    const trafficRegistrationPoints  = trafficPoints.data.trafficRegistrationPoints;

    const filteredTrafficPoints = trafficRegistrationPoints.filter((trafficPoint) => {
        const { name } = trafficPoint.location.county;
        if (name.toLowerCase() === county) {
            return true;
        } else return false;
    });
    
    return filteredTrafficPoints;
};

// Function with a switch to determine which function to run
const filterTrafficPoints = (fetchType, name, trafficPoints) => {
    console.log({fetchType, name, trafficPoints});
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

    // iterate thru array to run fetch on each trafficpoint id
    filteredTrafficPoints.map((id) => {
        // console.log([0,0,'-id', id.id]);

        // param to fetchData made to look like process.argv array
        // FetchData([0,0,'-id', id.id])
    })
    // console.log({filteredTrafficPoints});
    return filteredTrafficPoints;
};

export default filterTrafficPoints;