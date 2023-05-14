import React, { useState, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { Container, Main, Wrapper } from "./AppStyled";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import Home from "./pages/Home/Home";
import PersistLogin from "./components/auth/PersistLogin";
import RequireAuth from "./components/Modal/RequireAuth/RequireAuth";
import PageNotFound from "./components/HandleError/PageNotFound";

const Login = React.lazy(() => import("./pages/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./pages/ForgotPassword/ResetPassword")
);
const Register = React.lazy(() => import("./pages/Register/Register"));
const Video = React.lazy(() => import("./pages/Video/Video"));
const Search = React.lazy(() => import("./pages/Search/Search"));
const VideoCategory = React.lazy(() =>
  import("./pages/VideoCategory/VideoCategory")
);
const Report = React.lazy(() => import("./pages/Report/Report"));

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
              <Suspense>
                <Routes>
                  <Route path="/">
                    <Route element={<PersistLogin />}>
                      <Route path="login" element={<Login />} />
                      <Route
                        path="forgot_password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="reset_password"
                        element={<ResetPassword />}
                      />
                      <Route path="register" element={<Register />} />
                      <Route index element={<Home type="random" />} />
                      <Route
                        path="trending"
                        element={<Home type="trending" />}
                      />
                      <Route path="search" element={<Search />} />
                      <Route element={<RequireAuth />}>
                        <Route
                          path="subscribeVideo"
                          element={<Home type="subscribeVideo" />}
                        />
                        <Route
                          path="myVideo"
                          element={<Home type="myVideo" />}
                        />
                        <Route
                          path="likedVideo"
                          element={<Home type="likedVideo" />}
                        />
                      </Route>
                      <Route path="video/">
                        <Route path="tags/:type" element={<VideoCategory />} />
                        <Route path=":id" element={<Video />} />
                      </Route>
                      <Route path="report" element={<Report />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
