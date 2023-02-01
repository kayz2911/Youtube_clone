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
} from "./RegisterStyled";
import { Link } from "react-router-dom";
import useBackendApi from "../../hooks/useBackendApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backendApi = useBackendApi();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Sign up</Button>
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
