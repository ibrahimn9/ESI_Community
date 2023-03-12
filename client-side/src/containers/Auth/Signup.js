import { useState, useEffect } from "react";
import user from "../../services/userServices";
import createValidationMessage from "../../constants/createValidationMessage";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import { Stack, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../reducers/userReducer";

const Signup = () => {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state);

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
    const password = event.target.value;
    setPassword(password);
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
    const username = event.target.value;
    setUsername(username);
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

  const sendEmailConfirmation = async () => {
    dispatch(
      createUser({
        name: username,
        email,
        password,
      })
    );
    await user.sendEmail({ email });
  };

  const emailRender = async () => {
    const { email } = newUser;
    setEmail(email);
    const { data } = await user.verifyEmail(email);
    setIsEmailValid(data.valid && !data.exist);
  };

  useEffect(() => {
    emailRender();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          px: { xs: 2, md: 12 },
          py: 3,
          justifyContent: "space-between",
          alignItems: "center",
          top: 0,
        }}
      >
        <div>
          <img src={images.logo} />
        </div>
        <div className="auth-msg" style={{ fontSize: "18px" }}>
          Already have an account?{" "}
          <Link to="/auth/login">
            <span className="auth-link">Sign in</span>
          </Link>
        </div>
      </Stack>
      <Box
        sx={{
          position: "relative",
          transform: "translateX(-50%)",
          left: "50%",
          width: { xs: "80%", md: "50%" },
        }}
      >
        <Box
          sx={{
            marginTop: "100px",
            p: 4,
            borderRadius: "10px",
            border: "1px solid  #202637",
            background: "#1e1e1e",
            boxShadow: "0 0 10px #121212",
          }}
        >
          <form onSubmit={handleSubmit} className="auth-form">
            <span>Welcome to ESI Community !</span>
            <label>Enter your email</label>
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ alignItems: { md: "center" } }}
            >
              <input type="email" value={email} onChange={handleEmailChange} />
              <button
                disabled={!isEmailValid}
                onClick={() => setDisplayPassword(true)}
                className="signup-btn btn"
              >
                continue
              </button>
            </Stack>

            {displayPassword && (
              <>
                <label>Create password</label>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  sx={{ alignItems: { md: "center" } }}
                >
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    disabled={!isPasswordValid}
                    onClick={() => setDisplayUsername(true)}
                    className="signup-btn btn"
                  >
                    continue
                  </button>
                </Stack>
              </>
            )}

            {displayUsername && (
              <>
                <label>Enter your fullname</label>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  sx={{ alignItems: { md: "center" } }}
                >
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <Link to="/auth/email_confirmation" style={{ flexGrow: "1" }}>
                    <button
                      disabled={
                        !isUsernameValid || !isEmailValid || !isPasswordValid
                      }
                      onClick={sendEmailConfirmation}
                      className="signup-btn btn --grow"
                    >
                      continue
                    </button>
                  </Link>
                </Stack>
              </>
            )}
          </form>
        </Box>
        <div className="auth-msg">
          {!displayPassword && isEmailValid && <div>Email is valid!</div>}
          {email && !isEmailValid && (
            <div>Email is not valid or already taken.</div>
          )}
          {!displayUsername && displayPassword && isPasswordValid && (
            <div>password is valid!</div>
          )}
          {password &&
            !isPasswordValid &&
            errors.map((error) => <div key={error}>{error}</div>)}

          {displayUsername && isUsernameValid && <div>username is valid!</div>}
          {username &&
            !isUsernameValid &&
            errors?.map((error) => <div key={error}>{error}</div>)}
        </div>
        <div
          className="auth-msg"
          style={{ marginTop: "100px", fontWeight: "200", lineHeight: "20px" }}
        >
          By creating an account, you agree to the{" "}
          <span className="auth-link">Terms of Service.</span> For more
          information about ESI Community's privacy practices, see the{" "}
          <span className="auth-link">ESI Community Privacy Statement</span>.
          We'll occasionally send you account-related emails.
        </div>
      </Box>
    </>
  );
};

export default Signup;
