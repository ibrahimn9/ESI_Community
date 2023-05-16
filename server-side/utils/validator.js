const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const uuid = require('uuid');

const verifyEmail = async (email) => {
  const isValid = emailValidator.validate(email);
  const domain = email.split("@")[1];
  const isEmailSchoolDomin = domain === "esi-sba.dz";
  const userEmail = await User.findOne({ email });
  const IsExist = userEmail ? true : false;
  return { valid: isValid && isEmailSchoolDomin   , exist: IsExist };
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
  const username = email.substring(email.indexOf(".") + 1, email.indexOf("@"));
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "esicommunity23@gmail.com",
      pass: "xcesyhotluaghkct",
    },
  });

  const mailOption = {
    from: "esicommunity23@gmail.com",
    to: email,
    subject: "Email Confirmation for ESI Community",
    html: `<p>Dear ${username.toUpperCase()}</p>
           <p>Thank you for signing up for ESI COMMUNITY Before you can start using our service, we need to confirm your email address. </p>
           <p>Please enter the following confirmation code in the appropriate field on our ESI COMMUNIY</p>
           <h3>${confirmationCode}</h3>
           <p>If you did not sign up for ESI Community please disregard this email</p>
           <p>Thank you for choosing ESI Community!</p>
           <p>Best regards,</p>`,
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("res" + info.response);
    }
  });
  return confirmationCode;
};

const sendMessage = (message, emails) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "esicommunity23@gmail.com",
      pass: "xcesyhotluaghkct",
    },
  });

  emails.map(email => {
    const mailOption = {
      from: "esicommunity23@gmail.com",
      to: email,
      subject: message.subject,
      html: message.text,
    };

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("res" + info.response);
      }
    });
  })
}

const forgetPassword = async (email) => {
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "esicommunity23@gmail.com",
          pass: "xcesyhotluaghkct",
      },
  });
  
  const token = uuid.v4(); 
  const mailOption = {
      from: "esicommunity23@gmail.com",
      to: email,
      subject: "Change password for ESI-Community ",
      html: `<h2> ESI-Community </h2>
              <h1> Reset password </h1>
              <p>A password change has been requested for your account. If this was you, please use the </br>
              link below to reset your password </p>
              <a href="http://localhost:3000/forget_password/${token}">Reset Password</a>`
  };
  transporter.sendMail(mailOption, (err, info) => {
      if (err) {
          console.log(err);
      } else {
          console.log("res" + info.response);
      }
  });
  return token
}

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyUsername,
  confirmCode,
  sendMessage,
  forgetPassword,
};
