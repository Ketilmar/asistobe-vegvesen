import fetchTrafficPoints from "./src/components/fetchAllTrafficPoints.js";
import filterTrafficPoints from "./src/components/filterTrafficPoints.js";

// Console args
// Examples: "node index.js -m bergen", "node index.js -c vestland"
const cmdArgs = {
    // "-m" or "-c"
    type: process.argv[2],
    // Name of municipality/county
    name: process.argv[3],
};

// Main function of the app
const getData = () => {
    // all traffic points from API
    const trafficPoints = fetchTrafficPoints();

    // Filtered traffic points based on municipality or county
    const filteredTrafficPoints = filterTrafficPoints(
        cmdArgs.type,
        cmdArgs.name,
        trafficPoints
    );
};

getData();
