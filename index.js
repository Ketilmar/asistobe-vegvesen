// NOTE: need to run with '--experimental-specifier-resolution=node' from cmd line in some environments
    // more info here: https://github.com/nodejs/node/issues/27408#issuecomment-598314461

import { FetchData } from "./src/components/fetchData.js";
import { FileDeleter } from "./src/components/fileWriter.js";
import {fromDateDefault, toDateDefault} from "./src/components/getDefaultDates.js"

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


const cmdSwitch = process.argv[2]
const id = process.argv[3]
const fromDate = process.argv[4] || fromDateDefault;
const toDate = process.argv[5] || toDateDefault;
const path = process.argv[process.argv.length] || "trafficVolumeByLength.csv";

// Deletes existing files.        
switch (cmdSwitch) {
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

FetchData(cmdSwitch, id, fromDate, toDate, path)