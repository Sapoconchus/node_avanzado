'use strict';

const cote = require('cote');

const checkUser = new cote.Requester({
  name: 'findUser'
});

const mailer = new cote.Requester({
  name: 'sendEmail'
});

const thumbnail = new cote.Requester({
  name: 'create thumbnail'
});

const findUser = async(email, password) => {
  
  console.log('requester: ', email);
  
  return await checkUser.send({
    type: 'find user',
    email,
    password,
  });

};

const sendMail = (from, to, subject, body) => {
  return mailer.send({
    type: "send email",
    from,
    to,
    subject,
    body 
  });
};

const createThumbnail = (originalPath, thumbnailPath) => {
  return thumbnail.send({
    type: 'create thumbnail',
    path: originalPath,
    thumb: thumbnailPath
  });
};


module.exports = {findUser, sendMail, createThumbnail};