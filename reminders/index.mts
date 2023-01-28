// @ts-nocheck
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();
const admins = require("./admins.json");

adminEmails = [];
admins.map((admin) => {
  adminEmails.push(admin.email);
});

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

const sendMail = (receivers, subject, body) => {
  const mailOptions = {
    from: "Perfect Match <notifications@perfectmatch.ai>",
    to: "cornell.perfectmatch@gmail.com",
    bcc: receivers,
    subject: subject,
    replyTo: "cornell.perfectmatch@gmail.com",
    html: body,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.error(err);
  });
};

const remindSurveyOut = async (users) => {
  let receivers = [];
  users.forEach((user) => receivers.push(user.email));
  const body = fs.readFileSync("./release.html").toString();
  sendMail(receivers, "Perfect Match Survey Reminder", body);
};

sendMail(
  adminEmails,
  "Perfect Match Releasing Soon!",
  fs.readFileSync("./release.html").toString()
);
