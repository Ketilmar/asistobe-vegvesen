import fetchTrafficPoints from "./src/components/fetchTrafficPoints.js";

// Grabs the thrid argument and logs it to the console.

const consoleArg = process.argv[2];

// node index.js "argument here"

const dataFetch = async () => {
    const trafficPoints = fetchTrafficPoints();
    console.log(trafficPoints);
};

dataFetch();
