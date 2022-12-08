// NOTE: need to run with '--experimental-specifier-resolution=node' from cmd line.
// after i enabled for testing with live server
// more info here: https://github.com/nodejs/node/issues/27408#issuecomment-598314461

import { FetchData } from "./src/components/fetchData.js";


// FetchData("municipality: Bergen")


process.argv.forEach((value, index) => {
    console.log(index, value);
  });

//   if (process.argv[2] && process.argv[2] === '-m') {
//     console.log('Flag is present.');
//     FetchData({municipality:process.argv[3]})
//   } else {
//     console.log('Flag is not present.');
//   }


    // Checks presence of 'm' flag and query with search value 
  if (process.argv.indexOf('-m') > -1 ? 'municipality' : 'Flag is not present.'){
    console.log(process.argv.indexOf('-m'));
    console.log( process.argv[process.argv.indexOf('-m') + 1]);
    FetchData(['municipality', process.argv[process.argv.indexOf('-m') + 1]] )
  }

  // get a list of county's
  if (process.argv.indexOf('-c') > -1 ? 'county' : 'Flag is not present.'){
    console.log(process.argv.indexOf('-c'));
    console.log( process.argv[process.argv.indexOf('-c') + 1]);
    FetchData(['county', process.argv[process.argv.indexOf('-c') + 1]] )
  }