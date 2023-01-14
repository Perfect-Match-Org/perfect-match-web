// @ts-nocheck
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.gmail.com",
  auth: {
    user: "cornell.perfectmatch@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
  starttls: {
    enable: true,
  },
  secureConnection: true,
});

const sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.error(err);
  });
};

const remindOptedOut = async (users) => {
  let receivers = [];
  users.forEach((user) => receivers.push(user.email));
  const body = fs.readFileSync("./optin.html").toString();
  const mailOptions = {
    from: "Perfect Match <notifications@perfectmatch.ai>",
    to: "cornell.perfectmatch@gmail.com",
    bcc: receivers,
    subject: `Opt In`,
    replyTo: "cornell.perfectmatch@gmail.com",
    html: body,
  };
  sendMail(mailOptions);
};

const notifyMatchesOut = async (users) => {
  let receivers = [];
  users.forEach((user) => receivers.push(user.email));
  const body = fs.readFileSync("./optin.html").toString();
  const mailOptions = {
    from: "Perfect Match <notifications@perfectmatch.ai>",
    to: "cornell.perfectmatch@gmail.com",
    bcc: receivers,
    subject: `Matches Out`,
    replyTo: "cornell.perfectmatch@gmail.com",
    html: body,
  };
  sendMail(mailOptions);
};

const remindOptedOut = async (users) => {
  let receivers = [];
  users.forEach((user) => receivers.push(user.email));
  const body = fs.readFileSync("./optin.html").toString();
  const mailOptions = {
    from: "Perfect Match <notifications@perfectmatch.ai>",
    to: "cornell.perfectmatch@gmail.com",
    bcc: receivers,
    subject: `Opt In`,
    replyTo: "cornell.perfectmatch@gmail.com",
    html: body,
  };
  sendMail(mailOptions);
};

remindOptedOut([{ email: "ps2245@cornell.edu" }]);
