import fs from 'fs'


function FileDeleter(path){
  fs.rm(path, (err) => {
    if(err){
        console.error(err.message);
        return;
    }
    console.log(path, "--> deleted successfully");
  })
};

/** Can take any string object as input. Writes a file to selected path */
const FileWriter = (path, csv, writeMessage) => {
  // Append to the file if exists. Create if not
  if (fs.existsSync(path)){
    fs.appendFile(path, csv, (err) => {
        if (err)
          console.log(err);
        else {
          console.log(writeMessage, 'Appended to:', path);
        }
      }); 
    }
    else {
      fs.writeFile(path, csv, (err) => {
        if (err)
          console.log(err);
        else {
          console.log(writeMessage, "New file:", path);
        }
      });
    }
}


export  {FileWriter, FileDeleter}