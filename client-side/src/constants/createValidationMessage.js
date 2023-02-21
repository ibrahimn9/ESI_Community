const passwordValidationMessage = (arrayOfErrors) => {
  const errorMessages = [];
  arrayOfErrors.map((error) => {
    switch (error) {
      case "min":
        errorMessages.push("Password must contain at least 8 characters");
        break;
      case "max":
        errorMessages.push("Password must be no longer than 25 characters");
        break;
      case "digits":
        errorMessages.push("Password must contain digits");
        break;
      case "lowercase":
        errorMessages.push("Password must contain lowercase");
        break;
      default:
        errorMessages.push("Invalid password");
        break;
    }
  });
  return errorMessages;
};

const usernameValidationMessage = (arrayOfErrors) => {
  const errorMessages = [];
  arrayOfErrors.map((error) => {
    switch (error) {
      case "min":
        errorMessages.push("username must contain at least 4 characters");
        break;
      case "max":
        errorMessages.push("username must be no longer than 20 characters");
        break;
      default:
        errorMessages.push("Invalid username");
        break;
    }
  });
  return errorMessages;
};

export default {
  passwordValidationMessage,
  usernameValidationMessage,
};
