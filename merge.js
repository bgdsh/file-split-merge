const Promise = require('bluebird');
const fs = require('fs');

/**
 * merge small pieces to a new file
 * @param {array} files - an array of file absolute path
 * @param {string} newFile - path for the new file
 */
function merge(files, newFile) {
  const rStreams = files.map(file => fs.createReadStream(file));
  const wStream = fs.createWriteStream(newFile, {
    encoding: 'ascii',
    autoClose: false
  });
  let p = Promise.resolve();
  rStreams.forEach(rStream => {
    p = p.then(() => pWrite(rStream, wStream));
  });
  return p.then(lastResult => {
      wStream.close();
      return Promise.resolve('SUCCESS');
    })
    .catch(Promise.reject)
}

function pWrite(rStream, wStream) {
  return new Promise((resolve, reject) => {
    try {
      rStream.pipe(wStream, {
        end: false
      });
      rStream.on('end', () => {
        rStream.close();
        resolve('SUCCESS');
      });
      rStream.on('error', (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = merge;