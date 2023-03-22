import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Wrapper,
  Logo,
  Img,
  Item,
  Hr,
  Login,
  Button,
  Title,
} from "./MenuStyled";
import Youtube from "../../assets/img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { useSelector } from "react-redux";

const Menu = (props) => {
  const { currentUser } = useSelector((state) => state.user);

  const changeDarkModeHandler = () => {
    props.setDarkMode(!props.darkMode);
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={Youtube} />
            Youtube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link
          to="trending"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscribeVideo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Link
          to="likedVideo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ThumbUpOutlinedIcon />
            Liked videos
          </Item>
        </Link>
        <Link to="myVideo" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <PermIdentityIcon />
            Your videos
          </Item>
        </Link>
        {!currentUser && (
          <>
            <Hr />
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="login" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon /> SIGN IN
                </Button>
              </Link>
            </Login>
          </>
        )}
        <Hr />
        <Title>Best of Choice</Title>
        <Link
          to="video/tags/music"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
        </Link>
        <Link
          to="video/tags/sports"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SportsBasketballOutlinedIcon />
            Sports
          </Item>
        </Link>
        <Link
          to="video/tags/gaming"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
        </Link>
        <Link
          to="video/tags/movie"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <MovieOutlinedIcon />
            Movie
          </Item>
        </Link>
        <Link
          to="video/tags/news"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ArticleOutlinedIcon />
            News
          </Item>
        </Link>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Setting
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlinedIcon />
          Help
        </Item>
        <Item onClick={changeDarkModeHandler}>
          <SettingsBrightnessOutlinedIcon />
          {props.darkMode ? "Light mode" : "Dark mode"}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
