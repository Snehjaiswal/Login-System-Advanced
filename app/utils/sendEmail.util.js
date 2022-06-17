/*
 * Author:     Sneh Jaiswal
 * Created On: Fri Jan 21 2022 10:49:46 pm
 * Title:   ITEG Management System
 */

"use strict";
const config = require("../../config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: config.fromEmail,
    pass: config.fromEmailPassword,
  },
});

function sendVerificationMail(to, url, text) {
  const mailOptions = {
    from: config.fromEmail,
    to: to,
    subject: "Email Verification",
    html: `
		<div style="max-width: 500px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
			<h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome!!!</h2>
			<a  style="color: black; padding: 40px 20px; margin: 10px 10; display: inline-block;">${url}</a>
		</div>`,
  };

  return transporter
    .sendMail(mailOptions)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

module.exports = {
  sendVerificationMail,
};
