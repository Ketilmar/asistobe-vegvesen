// NOTE: need to run with '--experimental-specifier-resolution=node' from cmd line in some environments
    // more info here: https://github.com/nodejs/node/issues/27408#issuecomment-598314461

import { FetchData } from "./src/components/fetchData.js";
import { FileDeleter } from "./src/components/fileWriter.js";

// HOW TO USE:
// timeRange defaults to last complete 24 hour dataset (00:00 to 00:00)

    // search for traffic points. (Does not get traffic data)
    // Needs at least one character
        // node . -s <search phrase>
    
    // get trafficpoints for a county
        // node . -c vestland [yyyy-mm-dd yyyy-mm-dd]

    // Consol log a list of all counties name and number
        // node . -clist 

    // get trafficpoints for a municipality
        // node . -m bergen [yyyy-mm-dd yyyy-mm-dd]

    // Consol log a list of all municipalities name and number
        // node . -mlist

    // get data from a spesific reg.point
        // node . -id 44656V72812 [yyyy-mm-dd yyyy-mm-dd]

    // get data from all trafficpoints
        // node . -all [yyyy-mm-dd yyyy-mm-dd]

// Deletes existing files.        
switch (process.argv[2]) {
    case '-s':
        FileDeleter("searchResult.csv")
        break;

    case '-m':
        FileDeleter("trafficVolumeByLength.csv")
        break;

    case '-c':
        FileDeleter("trafficVolumeByLength.csv")
        break;

    case '-id':
        FileDeleter("trafficVolumeByLength.csv")
        break;

    case '-all':
        FileDeleter("trafficVolumeByLength.csv")
        break;
};

FetchData(process.argv )