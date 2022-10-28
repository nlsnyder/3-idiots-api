const mailConfig = require("../models/email-transporter");
const validations = require("../util/validations");

const emailContactForm = (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userMessage = req.body.message;

  if (!validations.validateName(userName)) {
    res
      .status(400)
      .json({ message: "Please enter a valid name.", status: "invalid" });
      return;
  }

  if (!validations.validateEmail(userEmail)) {
    res
      .status(400)
      .json({ message: "Please enter a valid email.", status: "invalid" });
      return;
  }

  if (!validations.validateSpecialCharacters(userMessage)) {
    res
      .status(400)
      .json({ message: "Please enter a valid message.", status: "invalid" });
      return;
  }

  mailConfig.options.params.name = userName;
  mailConfig.options.params.email = userEmail;
  mailConfig.options.params.message = userMessage;

  mailConfig.api.sendTransacEmail(mailConfig.options).catch((err) => {
    res.status(500).json({
      message:
        "Something went wrong when trying to submit contact form. Please try again.",
      status: "invalid",
      error: err,
    });
    return;
  });

  res
    .status(200)
    .json({ message: "Message sent successfully!", status: "valid" });
};

exports.emailContactForm = emailContactForm;
