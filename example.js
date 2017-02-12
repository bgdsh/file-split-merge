require('./index').merge(
  [ '/Users/mn/Desktop/zipfile.zip_0',
  '/Users/mn/Desktop/zipfile.zip_1',
  '/Users/mn/Desktop/zipfile.zip_2' ],
  '/Users/mn/Desktop/zipfile-new.zip'
).then(console.log)

require('./index').split('/Users/mn/Desktop/zipfile.zip', 100).then(console.log);