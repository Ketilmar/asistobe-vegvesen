// NOTE: need to run with '--experimental-specifier-resolution=node' from cmd line.
    // after i enabled for testing with live server
    // more info here: https://github.com/nodejs/node/issues/27408#issuecomment-598314461

import { FetchData } from "./src/components/fetchData.js";

// how to use:
    // to search for traffic points
        // node . -m bergen
    // get a list of counties
        // node . -c

    // get data from a spesific reg.point
        // node . -id 44656V72812

// process.argv.forEach((value, index) => {
//     console.log(index, value);
//   });


// this checks for an argument, and return 2 if present or -1 if not
console.log(process.argv.indexOf('-m'));
console.log( process.argv[process.argv.indexOf('-m') + 1]);
  
// call fetch based on input option
  switch (process.argv[2]){
    case '-m':
        FetchData(['municipality', process.argv[process.argv.indexOf('-m') + 1]] )
        break;

    case '-c':
        FetchData(['county', process.argv[process.argv.indexOf('-c') + 1]] )
        break;

    case '-id':
        FetchData(['trafficdata', process.argv[process.argv.indexOf('-id') + 1]] )
        break;
  }