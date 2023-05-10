import React, { useEffect } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import {
  Container,
  Wrapper,
  Title,
  InputFeedback,
  Button,
} from "./FeedbackStyled";
import Cookies from "js-cookie";
import useInput from "../../hooks/useInput";
import {
  OauthSignIn,
  sendMail,
} from "../../components/GoogleOauth/OauthSignIn";

const Feedback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    value: feedbackValue,
    isValid: feedbackIsValid,
    hasError: feedbackHasError,
    valueChangeHandler: feedbackChangeHandler,
    inputBlurHandler: feedbackBlurHandler,
    reset: resetFeedback,
  } = useInput((value) => value.length > 15);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("oauth_callback") === "1") {
      var fragmentString = location.hash.substring(1);
      var param = {};
      var regex = /([^&=]+)=([^&]*)/g,
        m;
      while ((m = regex.exec(fragmentString))) {
        param[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      const token = param["access_token"];
      const feedback = JSON.parse(param["state"]).feedbackValue;
      Cookies.set("send_mail_feedback_token", token, { expires: 1 / 24 });
      sendMail(token, feedback);
      navigate("/sendFeedback");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSendFeedback = (e) => {
    e.preventDefault();
    resetFeedback();
    const token = Cookies.get("send_mail_feedback_token");
    if (token) {
      sendMail(token, feedbackValue);
    } else {
      OauthSignIn({feedbackValue});
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Send Feedback</Title>
        <InputFeedback
          placeholder="Enter your feedback"
          type="text"
          id="email"
          cols="16"
          value={feedbackValue}
          onChange={feedbackChangeHandler}
          onBlur={feedbackBlurHandler}
        />
        {feedbackHasError ? <p>Feedback is invalid</p> : null}
        <Button onClick={handleSendFeedback} disabled={!feedbackIsValid}>
          Send
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Feedback;
