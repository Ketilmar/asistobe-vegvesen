import { trafficPoints } from "../json/trafficPoints.js";

const fetchTrafficPoints = () => {
    console.log("Traffic points fetched");
    return trafficPoints.data;
};

export default fetchTrafficPoints;
