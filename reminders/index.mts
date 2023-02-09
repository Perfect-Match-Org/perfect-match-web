// @ts-nocheck
const fs = require("fs");
const config = require("dotenv");
const AWS = require("aws-sdk");

config.config();
const ses = new AWS.SES({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const users = () => {
  let users = [];
  require("./incomplete.json").forEach((user) => users.push(user.email));
  return filterEmails(users);
};

const admins = () => {
  let admins = [];
  require("./admins.json").forEach((admin) => admins.push(admin.email));
  return filterEmails(admins);
};

/**
 * Removing duplicates from the array.
 */
const filterEmails = (emails) => {
  return [...new Set(emails)];
};

/**
 * Sends emails to the given addresses.
 * @param toAddresses: array of email addresses
 * @param subject: subject of the email
 * @param body: body of the email
 */
const sendEmails = async (toAddresses, subject, body) => {
  for (let i = 0; i < toAddresses.length; i += 30) {
    const params = {
      Destination: { BccAddresses: toAddresses.slice(i, i + 30) },
      Message: {
        Body: { Html: { Charset: "UTF-8", Data: body } },
        Subject: { Charset: "UTF-8", Data: subject },
      },
      Source: "noreply@perfectmatch.ai",
      ReplyToAddresses: ["cornell.perfectmatch@gmail.com"],
    };
    try {
      await ses.sendEmail(params).promise();
      console.log("Email sent to " + i + (i + 30));
    } catch (error) {
      console.log(error);
    }
  }
};

sendEmails(
  admins(),
  "Reminder: Complete Your Perfect Match Profile by January 13th",
  fs.readFileSync("./incomplete.html").toString()
);
