/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');
const readline = require('readline');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, 'utf8', function (err, content) {
    if (err) {
      callback(err, null);
    } else {
      content = content.toString().split('\n');
      callback(null, content[0]);
    }
  });
};

// async function getFirstLine(pathToFile) {
//   const readable = fs.createReadStream(pathToFile);
//   const reader = readline.createInterface({ input: readable });
//   const line = await new Promise((resolve) => {
//     reader.on('line', (line) => {
//       reader.close();
//       resolve(line);
//     });
//   });
//   readable.close();
//   return line;
// }

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
