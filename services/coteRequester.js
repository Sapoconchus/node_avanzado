'use strict';

const cote = require('cote');

const checkUser = new cote.Requester({
  name: 'findUser'
});

const mailer = new cote.Requester({
  name: 'sendEmail'
})

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


module.exports = {findUser, sendMail};