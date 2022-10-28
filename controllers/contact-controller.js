const mailConfig = require("../models/email-transporter");

const emailContactForm = async (req, res) => {
  mailConfig.options.params.name = req.body.name;
  mailConfig.options.params.email = req.body.email;
  mailConfig.options.params.message = req.body.message;

  mailConfig.api
    .sendTransacEmail(mailConfig.options)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  res.json({ message: "Done" });
};

exports.emailContactForm = emailContactForm;
