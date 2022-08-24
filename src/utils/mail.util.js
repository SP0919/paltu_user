const nodeMailer = require("nodemailer");
var transporter = nodeMailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: true,
  auth: {
    user: "dbd66e44cdca26",
    pass: "7feffd7828b103",
  },
});

module.exports = transporter;
