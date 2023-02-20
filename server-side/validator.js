const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

const verifyEmail = async (email) => {
  const isValid = emailValidator.validate(email);

  const domain = email.split("@")[1];
  const isEmailSchoolDomin = domain === "esi-sba.dz";

  return isValid && isEmailSchoolDomin;
};

const verifyPassword = (password) => {
  const passwordSchema = new passwordValidator();
  passwordSchema.is().min(8).is().max(25).has().digits().has().lowercase();
  return passwordSchema.validate(password, { list: true });
};

module.exports = {
  verifyEmail,
  verifyPassword,
};
