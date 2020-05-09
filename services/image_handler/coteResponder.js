'use strict';

require('dotenv').config();

const cote = require('cote');
const jimp = require('jimp');

const responder = new cote.Responder({
  name: 'thumb creator',
  key: 'picture handling'
});

responder.on('create thumbnail', async (req) => {
  try {
    const path = './public/' + req.path;
    const thumb = './public/' + req.thumb;
    console.log(path, thumb);
 
    jimp.read(path, (err, picture) => {
      if(err) throw err;
      picture.resize(100, 100)
        .write(thumb);
    });
    
  } catch(err) {
    return err;
  }

});

module.exports = responder;