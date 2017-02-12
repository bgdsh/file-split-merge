const MultiStream = require('multistream');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * merge small pieces to a new file
 * @param {array} files - an array of file absolute path
 * @param {string} newFile - path for the new file
 */
function merge(files, newFile) {
  return new Promise((resolve, reject) => {
    try {
      const rStreams = files.map(file => fs.createReadStream(file));
      const wStream = fs.createWriteStream(newFile, {
        encoding: 'ascii'
      });
      MultiStream(rStreams).pipe(wStream);
      //TODO: refactor the `multistream` package;
      // to get the real end event.
      resolve('SUCCESS');
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = merge;