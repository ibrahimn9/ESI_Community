const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const User = require("./models/user");

const verifyEmail = async (email) => {
  const isValid = emailValidator.validate(email);
  const domain = email.split("@")[1];
  const isEmailSchoolDomin = domain === "esi-sba.dz";
  const useremail = await User.findOne({ email });
  const IsExist = useremail ? true : false;
  return { valid: isValid && isEmailSchoolDomin, exist: IsExist };
};

const verifyPassword = (password) => {
  const passwordSchema = new passwordValidator();
  passwordSchema.is().min(8).is().max(25).has().digits().has().lowercase();
  return passwordSchema.validate(password, { list: true });
};

const verifyUsername = (username) => {
  const usernameSchema = new passwordValidator();
  usernameSchema.is().min(4).is().max(20).has().lowercase();
  return usernameSchema.validate(username, { list: true });
};

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyUsername
};
