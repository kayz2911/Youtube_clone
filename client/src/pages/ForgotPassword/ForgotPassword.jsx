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
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { isEmailValid } from "../../validator/Validator";
import useBackendApi from "../../hooks/useBackendApi";

const ForgotPassword = () => {
  const backendApi = useBackendApi();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmailValid);

  let formIsValid = false;
  if (emailIsValid) {
    formIsValid = true;
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!emailIsValid) {
      return;
    }
    try {
      await backendApi.forgotPassWord(emailValue);
      resetEmail();
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Email is not exists");
      }
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forgot password</Title>
        <SubTitle>Enter email to continue</SubTitle>
        <Input
          placeholder="email"
          type="text"
          id="email"
          value={emailValue}
          onClick={() => setErrorMessage("")}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError ? <p>Email is invalid</p> : null}
        {errorMessage ? errorMessage : null}
        <Button onClick={handleForgotPassword} disabled={!formIsValid}>
          Send mail
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

export default ForgotPassword;
