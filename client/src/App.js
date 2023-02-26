import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Container, Main, Wrapper } from "./AppStyled";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import Register from "./pages/Register/Register";
import Video from "./pages/Video/Video";
import Search from "./pages/Search/Search";
import VideoCategory from "./pages/VideoCategory/VideoCategory";
import PersistLogin from "./components/auth/PersistLogin";
import RequireAuth from "./components/Modal/RequireAuth/RequireAuth";
import PageNotFound from "./components/HandleError/PageNotFound";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route element={<PersistLogin />}>
                    <Route path="login" element={<Login />} />
                    <Route path="forgot_password" element={<ForgotPassword />} />
                    <Route path="reset_password" element={<ResetPassword />} />
                    <Route path="register" element={<Register />} />
                    <Route index element={<Home type="random" />} />
                    <Route path="trending" element={<Home type="trending" />} />
                    <Route path="search" element={<Search />} />
                    <Route element={<RequireAuth />}>
                      <Route
                        path="subscribeVideo"
                        element={<Home type="subscribeVideo"/>}
                      />
                    </Route>
                    <Route path="video/">
                      <Route path="tags/:type" element={<VideoCategory />} />
                      <Route path=":id" element={<Video />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
