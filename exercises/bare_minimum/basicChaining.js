/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('needle'));
var promisification = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFileAsync(readFilePath, 'utf8')
    .then((filePathContent) => {
      return filePathContent.split('\n')[0];
    })
    .then((githubHandle) => {
      return promisification.getGitHubProfileAsync(githubHandle);
    })
    .then((profile) => {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profile));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
