/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('needle');
var crypto = require('crypto');
var Promise = require('bluebird');
// Promise.promisifyAll(fs);

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user, callback) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = Promise.promisify(getGitHubProfile);
Promise.promisifyAll(request);



// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken);
Promise.promisifyAll(crypto);


// (3) Asyncronous file manipulation
var readFileAndMakeItFunnyAsync = function(filePath) {

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function(err, file) {
      if (err) {
        reject(err);
      } else {
        var funnyFile = file.split('\n')
          .map(function(line) {
            return line + ' lol';
          })
          .join('\n');
        resolve(funnyFile);
      }
    });
  });
};

// var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
