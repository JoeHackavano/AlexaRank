// Node script for extracting Alexa data
const path = require('path');
const fs = require('fs');
const flatten = require('flat');
const jsonexport = require('jsonexport');

// Get all files in the JSON directory
const directoryPath = path.join(__dirname, 'json');

// Passing directoryPath and callback function
var writer = fs.createWriteStream('alexa.csv');
let results = [];

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    // Reach each file.
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        let full_file = directoryPath + "/" + file;
        let days = extractData(full_file);
        days.forEach(i => results.push(flatten(i)));
    });

    // Write to CSV
    console.log(results);
    jsonexport(results, function(err, csv){
        if (err) {
            return console.log(err);
        }
        writer.write(csv); 
    });
});

/**
 * Get data from JSON file
 * @param {string} file Path to a JSON file.
 */
function extractData(file) {
    let rawdata = fs.readFileSync(file, 'utf8').substring(1);
    let stats = JSON.parse(rawdata);
    return stats.Awis.Results.Result.Alexa.TrafficHistory.HistoricalData.Data;
}
package.json
{
  "name": "alexa_stats",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "flat": "^5.0.0",
    "jsonexport": "^2.4.1"
  }
}
