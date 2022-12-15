// import for all the traffic points
import { trafficPoints } from "../json/trafficPoints.js";

// This function fetches all the traffic points from vegvesen API.(Currently grabs it from a local file to avoid fetching from API)
const fetchAllTrafficPoints = () => {
    console.log("Traffic points fetched");
    return trafficPoints.data;
};

export default fetchAllTrafficPoints;
