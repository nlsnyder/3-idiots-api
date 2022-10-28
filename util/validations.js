const EMAIL_REGEX = /(\w|[#!$^&*+.])+(@)(\w|[#!$^&*])+[.](\w|[#!$^&*])+$/;
const SPECIAL_CHARS_REGEX = /[^<>()&+%]+$/;
const NAME_REGEX = /(\w|[-.' ])+$/;

const validateRequired = (field) => {
  return field.length > 0 ? true : false;
};

const validateName = (name) => {
  if (typeof name != 'string') {
    return false;
  }
  return NAME_REGEX.test(name);
}

const validateEmail = (email) => {
  if (typeof email != 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email);
};

const validateSpecialCharacters = (message) => {
  if (typeof message != 'string') {
    return false;
  }
  return SPECIAL_CHARS_REGEX.test(message);
};

exports.validateRequired = validateRequired;
exports.validateEmail = validateEmail;
exports.validateSpecialCharacters = validateSpecialCharacters;
exports.validateName = validateName;