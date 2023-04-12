import { FetchData} from "./fetchData.js";

/** This function filters the traffic points based on the municipality name provided */
const filterByMunicipality = (id, data) => {
    const { trafficRegistrationPoints } = data.data;

    const filteredTrafficPoints = trafficRegistrationPoints.filter((trafficPoint) => {
        const { name } = trafficPoint.location.municipality;

        if (name.toLowerCase() === id.toLowerCase()) {
            return true;
        } 
        else return false;
    });

    return filteredTrafficPoints;
};

/** This function filters the traffic points based on the county name provided */
const filterByCounty = (id, data) => {
    const trafficRegistrationPoints  = data.data.trafficRegistrationPoints;

    const filteredTrafficPoints = trafficRegistrationPoints.filter((trafficPoint) => {
        const { name } = trafficPoint.location.county;

        if (name.toLowerCase() === id.toLowerCase()) {
            return true;
        } 
        else return false;
    });

    return filteredTrafficPoints;
};

const getAll = (trafficPoints) => {
    return trafficPoints.data.trafficRegistrationPoints;
};

/** Function with a switch to filter County or Municipality based on provided cmd input */
const filterTrafficPoints = (cmdSwitch, id, fromDate, toDate, data, path) => {
    let filteredTrafficPoints = null;

    switch (cmdSwitch) {
        case "-m":
            filteredTrafficPoints = filterByMunicipality(id, data);
            break;

        case "-c":
            filteredTrafficPoints = filterByCounty(id, data);
            break;

        case "-all":
            filteredTrafficPoints = getAll(data);
            break;

        default:
            // If wrong inputs console log which inputs are correct
            console.log("Check your input. Please use -m <municipality> or -c <county>. You typed", {fetchType});
            break;
    };

    mapFetch(filteredTrafficPoints, fromDate, toDate, path)

    // return filteredTrafficPoints
};

const mapFetch = async (filteredTrafficPoints, fromDate, toDate, path) => {
    let endCursor = '';
    await filteredTrafficPoints.map((id, index) => {
        setTimeout(() => {
            FetchData('-id', id.id, fromDate, toDate, endCursor, path);
        }, 150 * index);
      });
};

export {filterTrafficPoints, filterByMunicipality, filterByCounty}