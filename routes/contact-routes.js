const express = require("express");
const { body } = require("express-validator");
const validators = require("../util/validations");
const contactController = require("../controllers/contact-controller");

const router = express.Router();

router.post(
  "/email",
  body("email").isEmail().normalizeEmail(),
  body("name").not().isEmpty().trim().custom(name => validators.validateName(name)),
  body("message")
    .not()
    .isEmpty()
    .escape()
    .isLength({ min: 5 }),
  contactController.emailContactForm
);

module.exports = router;
