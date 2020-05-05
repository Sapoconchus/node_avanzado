const pics = require('fs');
const path = require('path');

const adPics = './public/ad_pics';
const thumbnails = './public/thumbnails';

pics.readdir(adPics, (err, files) => {
  if (err) throw err;
  files.forEach(picture => pics.unlinkSync(path.join(adPics, picture)));
});

pics.readdir(thumbnails, (err, files) => {
  if (err) throw err;
  files.forEach(picture => pics.unlinkSync(path.join(thumbnails, picture)));
});

module.exports = pics;