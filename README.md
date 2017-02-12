# file-split-merge
## how to use

[![Greenkeeper badge](https://badges.greenkeeper.io/bgdsh/file-split-merge.svg)](https://greenkeeper.io/)
install `npm install file-split-merge` 

```javascript
const fileSplitMerge = require('file-split-merge');

fileSplitMerge.split('/Users/mn/Desktop/zipfile.zip', 100).then(console.log);
fileSplitMerge.merge(
  [ '/Users/mn/Desktop/zipfile.zip_0',
  '/Users/mn/Desktop/zipfile.zip_1',
  '/Users/mn/Desktop/zipfile.zip_2' ],
  '/Users/mn/Desktop/zipfile-new.zip'
).then(console.log)
```


## TODO
* get success when merge real finished.
* write down the test code
