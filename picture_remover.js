const pics = require('fs');
const path = require('path');

const directory = './public/ad_pics';

pics.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(picture => pics.unlinkSync(path.join(directory, picture)));
});

module.exports = pics;