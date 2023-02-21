const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const nodemailer = require("nodemailer")
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

const confirmCode = async (email) => {
  let confirmationCode = Math.floor(Math.random() * 900000) + 100000;
  const username = email.substring(email.indexOf('.') + 1, email.indexOf('@'));
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zeddoun.lokmane@gmail.com",
      pass: "xcagcrluskoiodph"
    }
  })

  const mailOption = {
    from: "zeddoun.lokmane@gmail.com",
    to: email,
    subject: "Email Confirmation for ESI COMMUNITY",
    html: `<p>Dear ${username}</p><p>Thank you for signing up for ESI COMMUNITY Before you can start using our service, we need to confirm your email address. </p>
<p>Please enter the following confirmation code in the appropriate field on our ESI COMMUNIY</p>
<p><b>${confirmationCode}</b></p>
<p>If you did not sign up for ESI COMMNITY please disregard this email</p>
<p>Thank you for choosing ESI COMMNITY!</p>
<p>Best regards,</p>`

  }

  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log('res' + info.response)
    }
  })
  return confirmationCode;
}

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyUsername,
  confirmCode
};
