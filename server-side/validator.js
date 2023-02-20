const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const User = require('./models/user');

const verifyEmail = async (email) => {
  const isValid = await emailValidator.validate(email);
  const domain = email.split("@")[1];
  const isEmailSchoolDomin = domain === "esi-sba.dz";
  const useremail = await User.findOne({email:email});
  let IsExist
  if (useremail){
    IsExist = true
  } else {
    IsExist = false
  }
  return {isvalid:isValid && isEmailSchoolDomin, 
    isexist : IsExist
  } ;
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
