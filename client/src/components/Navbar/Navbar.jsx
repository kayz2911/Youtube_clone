import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Wrapper,
  Search,
  Input,
  Button,
  User,
  Avatar,
} from "./NavbarStyled";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import OptionBox from "../OptionBox/OptionBox";
import { useSelector } from "react-redux";
import UploadModal from "../Modal/UploadVideo/UploadModal";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showOptionBox, setShowOptionBox] = useState(false);
  const [showUploadVideoModal, setShowUploadVideoModal] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const hoverIconHandler = (e) => {
    e.target.style.cursor = "pointer";
  };

  const goToSearch = useCallback(() => {
    if (query.trim().length > 0) {
      navigate({
        pathname: `/search`,
        search: `?q=${query}`,
      });
    }
  }, [query, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [query, goToSearch]);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={goToSearch}
              onMouseOver={hoverIconHandler}
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                onClick={() => setShowUploadVideoModal(true)}
                onMouseOver={hoverIconHandler}
              />
              {showOptionBox ? (
                <OptionBox
                  hideOptionBox={() => {
                    setShowOptionBox(false);
                  }}
                />
              ) : null}
              <Avatar
                src={currentUser.img}
                onClick={() => {
                  setShowOptionBox(!showOptionBox);
                }}
                onMouseOver={hoverIconHandler}
              />
              {currentUser.name}
            </User>
          ) : (
            <Link to="login" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon /> SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {showUploadVideoModal ? (
        <UploadModal setShowUploadVideoModal={setShowUploadVideoModal} />
      ) : null}
    </>
  );
};

export default Navbar;
