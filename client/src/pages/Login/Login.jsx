import React from "react";
import {
  Container,
  Wrapper,
  Title,
  SubTitle,
  Input,
  Button,
  More,
  Helpers,
  Helper,
} from "./LoginStyled";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import useInput from "../../hooks/useInput";
import { isEmailValid, isPasswordValid } from "../../validator/Validator";
import useBackendApi from "../../hooks/useBackendApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const backendApi = useBackendApi();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmailValid);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPasswordValid);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    dispatch(userActions.loginStart());
    try {
      const res = await backendApi.loginUser(emailValue, passwordValue);
      dispatch(userActions.loginSuccess(res.data));
      resetEmail();
      resetPassword();
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(userActions.loginFailure());
    }
  };

  const refreshMessage = () => {
    dispatch(userActions.logout());
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input
          placeholder="email"
          type="text"
          id="email"
          value={emailValue}
          onClick={refreshMessage}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError ? <p>Email is invalid</p> : null}
        <Input
          placeholder="password"
          type="password"
          id="password"
          value={passwordValue}
          onClick={refreshMessage}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError ? <p>Password is invalid</p> : null}
        {error ? <p>Wrong email or password</p> : null}
        <Button onClick={handleLogin} disabled={!formIsValid}>
          Sign in
        </Button>
        <Link
          to="/forgot_password"
          style={{ textDecoration: "none", color: "inherit", fontSize: "12px" }}
        >
          Forgot password
        </Link>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "inherit", fontSize: "12px" }}
        >
          Have not account yet
        </Link>
      </Wrapper>
      <More>
        English(USA)
        <Helpers>
          <Helper>Help</Helper>
          <Helper>Privacy</Helper>
          <Helper>Terms</Helper>
        </Helpers>
      </More>
    </Container>
  );
};

export default Login;
