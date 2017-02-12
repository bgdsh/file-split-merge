const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));

/**
 * Split a big file to small pieces
 * @param {string} filePath the absolute file path.
 * @param {number} partSize the file size of one piece.
 */
function split(filePath, partSize) {
  return Promise
    .resolve({
      filePath: filePath,
      partSize: partSize * 1024
    })
    .then(getFileStats)
    .then(caculate)
    .then(doSplit)
    .then((results) => {
      console.log(results);
    })
    .catch(Promise.reject);
}

function getFileStats(params) {
  params.stats = fs.lstatAsync(params.filePath)
  return Promise.props(params);
}

function caculate(params) {
  const fileSize = params.stats.size;
  const partSize = params.partSize;
  if (fileSize < partSize) {
    return Promise.reject('FILE_TOO_SMALL');
  }
  const parts = Math.ceil(parseFloat(fileSize) / parseFloat(partSize));
  params.fileSize = fileSize;
  params.parts = parts;
  delete params.stats;
  return params;
}

function doSplit(params) {
  const partSize = params.partSize;
  const fileSize = params.fileSize;
  const filePath = params.filePath;
  const parts = params.parts;
  const promises = [];
  for (let i = 0; i < parts; i++) {
    const range = [];
    range[0] = i * partSize;
    range[1] = range[0] + partSize;
    if (i == parts - 1) {
      range[1] = fileSize;
    }
    promises.push(createSplit(filePath, range, filePath + '_' + i));
  }
  return Promise.all(promises);
}

function createSplit(filePath, range, newFilePath) {
  return new Promise((resolve, reject) => {
    const rStream = fs.createReadStream(filePath, {
      flags: 'r',
      start: range[0],
      end: range[1],
      autoClose: true
    });
    const wStream = fs.createWriteStream(newFilePath);
    rStream.pipe(wStream);
    rStream.on('end', () => {
      wStream.end();
      resolve(newFilePath);
    })
  });
}

module.exports = split;
