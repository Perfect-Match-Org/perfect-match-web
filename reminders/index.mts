// @ts-nocheck
const fs = require("fs");
const config = require("dotenv");
const AWS = require("aws-sdk");
const admins = require("./admins.json");

// ---Set Up AWS SES---
config.config();
const ses = new AWS.SES({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

// ---Get Users and Admins---
let users = [];
require("./users.json").forEach((user) => {
  users.push(user.email);
});

let adminEmails = [];
admins.forEach((admin) => {
  adminEmails.push(admin.email);
});

// ---Send Emails---
const sendEmails = async (toAddresses, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "cornell.perfectmatch@gmail.com",
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log("Email sent:", data.MessageId);
  } catch (error) {
    console.error(error);
  }
};

sendEmails(
  ["ps2245@cornell.edu"],
  "Perfect Match is Releasing Soon!",
  fs.readFileSync("./release.html").toString()
);
