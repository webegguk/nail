'use strict';
const config = require('./config');
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: config.server.host,
        port: config.server.port,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: config.server.user.name,
            pass: config.server.user.pass
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"webegg 👻" <foo@webegg.co.uk>', // sender address
        to: config.emails, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world 😊</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@webegg.co.uk>
        // Preview URL: ...
    });
});