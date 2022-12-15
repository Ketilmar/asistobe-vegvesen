import fetchTrafficPoints from "./src/components/fetchAllTrafficPoints.js";
import filterTrafficPoints from "./src/components/filterTrafficPoints.js";
import fetchData from "./src/components/fetchData.js";

// Console args
// Examples: "node index.js -m bergen", "node index.js -c vestland"
const cmdArgs = {
    type: process.argv[2],
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
    const data = fetchData(filteredTrafficPoints);
};

getData();
