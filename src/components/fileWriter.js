import fs from 'fs-extra'

/** Checks if file exists */
let FileExists = (path, message) => fs.pathExists(path, (err) => {
  if (err)
    console.log(err);
  else {
    console.log(message);
    // console.log("File exists");
  }
});


/** Can take any string object as input. Writes a file to project root folder named 'trafficdata.csv' */
const FileWriter = (path, csv, writeMessage) => {

  // Append to the file if exists. Create if not
  if (FileExists(path)){
    fs.appendFile(path, csv, (err) => {
        if (err)
          console.log(err);
        else {
          console.log(writeMessage, '- Appended');
        }
      });
    }
    else {
      fs.writeFile(path, csv, (err) => {
        if (err)
          console.log(err);
        else {
          console.log(writeMessage, "- Overwrite");
        }
      });
    }
}


export  {FileWriter, FileExists}