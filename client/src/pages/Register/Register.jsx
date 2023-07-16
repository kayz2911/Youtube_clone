import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  Label,
} from "./RegisterStyled";
import { Link } from "react-router-dom";
import {
  isUserNameValid,
  isEmailValid,
  isPasswordValid,
} from "../../validator/Validator";
import useInput from "../../hooks/useInput";
import useUploadFile from "../../hooks/useUploadFile";
import useBackendApi from "../../hooks/useBackendApi";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const Register = () => {
  const backendApi = useBackendApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isUserNameValid);

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
  if (usernameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const {
    error: imgError,
    downloadURL: imgSrc,
    uploadFile: uploadImgFirebase,
  } = useUploadFile();

  const handleImgFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const registerUser = useCallback(async () => {
    if (imgError) {
      return;
    }
    try {
      const res = await backendApi.registerUser({
        name: usernameValue,
        email: emailValue,
        password: passwordValue,
        img: imgSrc,
      });
      if (res.status === 201) {
        resetUsername();
        resetEmail();
        resetPassword();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [
    imgError,
    usernameValue,
    emailValue,
    passwordValue,
    imgSrc,
    resetUsername,
    resetEmail,
    resetPassword,
    navigate,
    backendApi,
  ]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!usernameIsValid || !emailIsValid || !passwordIsValid || !img) {
      return;
    }
    setLoading(true);
    await uploadImgFirebase(img, "images/channelImg/").catch((error) => {
      console.log("Error on uploading image" + error);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Only execute if downloadURL values are available
    if (imgSrc) {
      registerUser();
    }
  }, [imgSrc, registerUser]);

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input
          placeholder={usernameHasError ? "Username is invalid" : "Username"}
          value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          style={usernameHasError ? { borderColor: "red" } : null}
        />
        <Input
          placeholder={emailHasError ? "Email is invalid" : "Email"}
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          style={emailHasError ? { borderColor: "red" } : null}
        />
        <Input
          type="password"
          placeholder={passwordHasError ? "Password is invalid" : "Password"}
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          style={passwordHasError ? { borderColor: "red" } : null}
        />

        <Label>Image:</Label>
        <Input type="file" accept="image/*" onChange={handleImgFileChange} />
        {imgError ? <p>Upload image failed</p> : null}
        <Button onClick={handleRegister} disabled={!formIsValid}>
          Sign up
        </Button>
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "inherit", fontSize: "12px" }}
        >
          Login to already account
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

export default Register;
