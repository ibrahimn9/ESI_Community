import { useState } from "react";
import user from "../../services/user";
import createValidationMessage from "../../constants/createValidationMessage";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayUsername, setDisplayUsername] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = async (event) => {
    const email = event.target.value;
    setEmail(email);

    try {
      const { data } = await user.verifyEmail(email);
      setIsEmailValid(data.valid && !data.exist);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (event) => {
    setPassword(event.target.value);
    try {
      const { data } = await user.verifyPassword({ password });
      const arrayOfErrors = createValidationMessage.passwordValidationMessage(
        data.errors
      );
      setIsPasswordValid(data.valid);
      setErrors(arrayOfErrors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameChange = async (event) => {
    setUsername(event.target.value);
    try {
      const { data } = await user.verifyUserName(username);
      const arrayOfErrors = createValidationMessage.usernameValidationMessage(
        data.errors
      );
      setIsUsernameValid(data.valid);
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
        {!isEmailValid && <div>Email is not valid or already taken.</div>}

        {displayPassword && (
          <>
            <h2>Create password</h2>
            <input
              name="password"
              type="text"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              disabled={!isPasswordValid}
              onClick={() => setDisplayUsername(true)}
            >
              continue
            </button>
            {isPasswordValid && <div>password is valid!</div>}
            {!isPasswordValid &&
              errors.map((error) => <div key={error}>{error}</div>)}
          </>
        )}

        {displayUsername && (
          <>
            <h2>Enter your fullname</h2>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <Link to="/auth/email_conformation">
              <button disabled={!isUsernameValid}>create account</button>
            </Link>
            {isUsernameValid && <div>username is valid!</div>}
            {!isUsernameValid &&
              errors?.map((error) => <div key={error}>{error}</div>)}
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;
