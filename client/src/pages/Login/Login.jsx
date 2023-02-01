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
} from "./LoginStyled";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import useBackendApi from "../../hooks/useBackendApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendApi = useBackendApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userActions.loginStart());
    try {
      const res = await backendApi.loginUser(email, password);
      dispatch(userActions.loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(userActions.loginFailure());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
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
