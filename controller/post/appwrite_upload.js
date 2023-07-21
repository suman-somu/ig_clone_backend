const sdk = require("node-appwrite");
const fs = require("fs");
require('dotenv').config();

appwriteUpload = async (filepath) => {
  const client = new sdk.Client();

  const storage = new sdk.Storage(client);

  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_APIKEY); // Your secret API key
  for (const file of filepath) {
    const path =
      "/home/suman/myFolder/programming/prsnl projects/instagram_clone/uploads/posts/" +
      file;
    const newfilename = file + ".jpeg";
    const promise = storage.createFile(
      "64b7bba661f692c3ffa5",
      sdk.ID.unique(),
      sdk.InputFile.fromPath(path, newfilename)
    );
    promise.then(
      function (response) {
        // console.log(response);

        //delete file from local storage
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
        return true;
      },
      function (error) {
        console.log(error);
        return false;
      }
    );
  }
};

module.exports = appwriteUpload;
