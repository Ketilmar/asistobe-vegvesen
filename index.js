// NOTE: need to run with '--experimental-specifier-resolution=node' from cmd line in some environments
    // more info here: https://github.com/nodejs/node/issues/27408#issuecomment-598314461

import { FetchData } from "./src/components/fetchData.js";
import { FileDeleter } from "./src/components/fileWriter.js";

// HOW TO USE:
    // to search for traffic points
        // node . -s <search phrase>
    // get trafficpoints for a county
        // node . -c vestland
    // get trafficpoints for a municipality
        // node . -m bergen yyyy-mm-dd yyyy-mm-dd
    // get data from a spesific reg.point
        // node . -id 44656V72812 yyyy-mm-dd yyyy-mm-dd
    // get all trafficpoints
        // node . -all

// Deletes existing files before prog. runs.        
switch (process.argv[2]) {
    case '-s':      
        FileDeleter("searchResult.csv")
        break;

    case '-m':       
        FileDeleter("trafficdata.csv")
        break;

    case '-c':       
        FileDeleter("trafficdata.csv")
        break;

    case '-id':       
        // FileDeleter("trafficdata.csv")
        // FileDeleter("trafficVolume.csv")
        FileDeleter("trafficVolumeByLength.csv")
        break;

    case '-all':       
        // FileDeleter("trafficdata.csv")
        break;
};

FetchData(process.argv )