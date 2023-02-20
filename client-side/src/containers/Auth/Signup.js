import { useState } from "react";
import user from "../../services/user";
import createValidationMessage from "../../constants/createValidationMessage";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = async (event) => {
    const email = event.target.value;
    setEmail(email);

    try {
      const response = await user.verifyEmail(email);
      const { data } = response;
      setIsEmailValid(data.valid);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (event) => {
    setPassword(event.target.value);
    try {
      const { data } = await user.verifyPassword({password,});
      const arrayOfErrors = createValidationMessage.passwordValidationMessage(data.errors);
      console.log(arrayOfErrors)
      setIsPasswordValid(data.valid);
      setErrors(arrayOfErrors);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <h2>Enter your email</h2>
        <input type="email" value={email} onChange={handleEmailChange} />
        <button
          disabled={!isEmailValid}
          onClick={() => setDisplayPassword(true)}
        >
          continue
        </button>
        {isEmailValid && <div>Email is valid!</div>}
        {!isEmailValid && <div>Email is not valid.</div>}

        {displayPassword && (
          <>
            <h2>Create password</h2>
            <input
              name="password"
              type="text"
              onChange={handlePasswordChange}
            />
            <button>continue</button>
            {isPasswordValid && <div>password is valid!</div>}
            {!isPasswordValid && errors.map((error) => (<div key={error}>{error}</div>))}
          </>
        )}
        {/* 
        {validatePwd && (
          <>
            <h2>Enter your fullname</h2>
            <input name="fullname" type="text" />
            <button type="submit">create account</button>
          </>
        )} */}
      </form>
    </div>
  );
};

export default Signup;
