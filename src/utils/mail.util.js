let transporter = nodeMailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: true,
  auth: {
    user: "dbd66e44cdca26",
    pass: "7feffd7828b103",
  },
});
let mailOptions = {
  from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
  to: req.body.to, // list of receivers
  subject: req.body.subject, // Subject line
  text: req.body.body, // plain text body
  html: "<b>NodeJS Email Tutorial</b>", // html body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Message %s sent: %s", info.messageId, info.response);
  res.render("index");
});
