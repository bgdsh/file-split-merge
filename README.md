# file-split-merge
## how to use
install `npm install file-split-merge --save` 

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
* write down the test code
