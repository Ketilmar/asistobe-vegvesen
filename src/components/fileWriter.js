import fs from 'fs'

const FileWriter = (csv) => {
    fs.writeFile("jsonToCsv.csv", csv, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File write success");
          console.log("Content of the new file:\n");
          console.log(fs.readFileSync("jsonToCsv.csv", "utf8"));
        }
      });
}

export  {FileWriter}