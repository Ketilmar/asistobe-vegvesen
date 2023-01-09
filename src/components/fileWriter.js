import fs from 'fs'

/** Can take any string object as input. Writes a file to project root folder named 'trafficdata.csv' */
const FileWriter = (csv) => {
    fs.writeFile("trafficdata.csv", csv, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File write success");
          console.log("Content of the new file:\n");
          console.log(fs.readFileSync("trafficdata.csv", "utf8"));
        }
      });
}

export  {FileWriter}