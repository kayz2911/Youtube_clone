import React, { useState } from "react";
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
} from "./ForgotPasswordStyled";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { isPasswordValid } from "../../validator/Validator";
import useBackendApi from "../../hooks/useBackendApi";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const backendApi = useBackendApi();

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPasswordValid);

  let formIsValid = false;
  if (passwordIsValid) {
    formIsValid = true;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!passwordIsValid) {
      return;
    }
    try {
      await backendApi.resetPassword(location.search, passwordValue);
      resetPassword();
      navigate("/login");
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Unauthorized");
      } else if (error.response.status === 403) {
        setErrorMessage("Reset password failed");
      }
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Reset password</Title>
        <SubTitle>Enter new password to continue</SubTitle>
        <Input
          placeholder="password"
          type="password"
          id="password"
          value={passwordValue}
          onClick={() => setErrorMessage("")}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError ? <p>Password is invalid</p> : null}
        {errorMessage ? errorMessage : null}
        <Button onClick={handleResetPassword} disabled={!formIsValid}>
          Reset
        </Button>
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "inherit", fontSize: "12px" }}
        >
          Back to login
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

export default ResetPassword;
