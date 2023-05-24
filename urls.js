const fs = require("fs");
const axios = require("axios");
const { error } = require("console");

function makeHtml(content, url) {
  console.log("THIS IS HOSTNAME");

  console.log(url.hostname);

  console.log("THIS IS content");

  console.log(content.data);
  fs.writeFile(`${url.hostname}.txt`, content.data, "utf8", (err) => {
    if (err) {
      console.log(error);
      return;
    }
    console.log("File has been written successfully.");
  });
}

async function get(data) {
  const lines = data.split("\n");

  for (let line of lines) {
    try {
      // Perform asynchronous operations with each line, e.g., make an HTTP request
      const response = await axios.get(line);
      const parsedURL = new URL(line);
      makeHtml(response, parsedURL);
    } catch (error) {
      console.log(error);
    }
  }
}

let fileName = process.argv[2];
fs.readFile(fileName, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1); // End the script with an error status
  } else {
    get(data);
  }
});
