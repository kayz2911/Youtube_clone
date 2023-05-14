import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Wrapper, Title, SubTitle, Button } from "./ReportStyled";
import Cookies from "js-cookie";
import {
  OauthSignIn,
  sendMail,
} from "../../components/GoogleOauth/OauthSignIn";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./react-quill-styles.css";

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportValue, setReportValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ font: [] }],
      [{ align: [] }],
      ["image"],
    ],
  };

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
      const report = JSON.parse(param["state"]).reportValue;
      Cookies.set("send_mail_report_token", token, { expires: 1 / 24 });
      sendMail(token, report);
      navigate("/report");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSendReport = (e) => {
    e.preventDefault();
    const token = Cookies.get("send_mail_report_token");
    if (token) {
      sendMail(token, reportValue);
    } else {
      OauthSignIn({ reportValue });
    }
    setReportValue("");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Report violation of community standards</Title>
        <SubTitle>
          You should provide description details about content that violate
          community standards, otherwise it will be not counted
        </SubTitle>
        <ReactQuill
          className="react-quill-class"
          value={reportValue}
          onChange={setReportValue}
          modules={modules}
        />
        <Button
          onClick={handleSendReport}
          disabled={reportValue.length < 20 ? "disabled" : null}
        >
          Send
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Report;
