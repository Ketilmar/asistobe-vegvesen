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


    // Checks presence of 'm' flag and query with value 
  if (process.argv.indexOf('-m') > -1 ? 'municipality' : 'Flag is not present.'){
    console.log(process.argv.indexOf('-m'));
    console.log( process.argv[process.argv.indexOf('-m') + 1]);
    FetchData(['municipality', process.argv[process.argv.indexOf('-m') + 1]] )
  }