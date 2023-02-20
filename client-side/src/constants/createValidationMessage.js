const passwordValidationMessage = (arrayOfErrors) => {
    const errorMessages = [];
    arrayOfErrors.map((error) => { 
      switch (error) {
        case 'min':
          errorMessages.push('Password must contain at least 8 characters');
          break;
        case 'max':
          errorMessages.push('Password must be no longer than 25 characters');
          break;
        case 'digits':
          errorMessages.push('Password must contain digits');
          break;
        case 'lowercase':
            errorMessages.push('Password must contain lowercase');
            break;
        default:
          errorMessages.push('Invalid password');
          break;
      }
    });
    return errorMessages;
  };

const  userNameValidationMessage = (rule) => {
    switch (rule) {
      case 'min':
        return `user_name must contain at least 4 characters`;
      case 'max':
        return `user_name must be no longer than 20 characters`;
    }
  }

export default {
    passwordValidationMessage,
    userNameValidationMessage,
}

