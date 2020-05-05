'use strict';

const cote = require('cote');
const jimp = require('jimp');
const fs = require('fs');

const responder = new cote.Responder({name: 'thumb creator'});

responder.on('create thumbnail', req => {
  try {
    const path = './public/' + req.cover;
    const thumb = './public/' + req.thumb;
    console.log(thumb);
    fs.copyFileSync(path, thumb);
    /*
    jimp.read(path)
      .then(cover => {
        return cover
          .resize(100,100)
      })
*/

  } catch(err) {
    return err;
  }

});

responder.on('send email', async (req) => {
  const from = req.from;
  const subject = req.subject;
  const body = req.body;
  const email = req.to;

  const user = await User.findOne({email});

  return user.sendEmail(from, subject, body);

});

module.exports = responder;