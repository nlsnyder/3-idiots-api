const mailConfig = require("../models/email-transporter");
const { validationResult } = require("express-validator");

const emailContactForm = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors?.errors });
  }

  const { name, email, message } = req.body;

  mailConfig.options.params.name = name;
  mailConfig.options.params.email = email;
  mailConfig.options.params.message = message;

  mailConfig.api.sendTransacEmail(mailConfig.options).catch((err) => {
    return res.status(500).json({
      error:
        "Something went wrong when trying to submit contact form. Please try again.",
      status: "invalid",
      error: err,
    });
  });

  res.json({ message: "Message sent successfully!" });
};

exports.emailContactForm = emailContactForm;
