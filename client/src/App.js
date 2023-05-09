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
const Feedback = React.lazy(() => import("./pages/Feedback/Feedback"));

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
                    <Route
                      path="login"
                      element={
                        <Suspense>
                          <Login />
                        </Suspense>
                      }
                    />
                    <Route
                      path="forgot_password"
                      element={
                        <Suspense>
                          <ForgotPassword />
                        </Suspense>
                      }
                    />
                    <Route
                      path="reset_password"
                      element={
                        <Suspense>
                          <ResetPassword />
                        </Suspense>
                      }
                    />
                    <Route
                      path="register"
                      element={
                        <Suspense>
                          <Register />
                        </Suspense>
                      }
                    />
                    <Route index element={<Home type="random" />} />
                    <Route path="trending" element={<Home type="trending" />} />
                    <Route path="search" element={<Search />} />
                    <Route element={<RequireAuth />}>
                      <Route
                        path="subscribeVideo"
                        element={<Home type="subscribeVideo" />}
                      />
                      <Route path="myVideo" element={<Home type="myVideo" />} />
                      <Route
                        path="likedVideo"
                        element={<Home type="likedVideo" />}
                      />
                    </Route>
                    <Route path="video/">
                      <Route
                        path="tags/:type"
                        element={
                          <Suspense>
                            <VideoCategory />
                          </Suspense>
                        }
                      />
                      <Route
                        path=":id"
                        element={
                          <Suspense>
                            <Video />
                          </Suspense>
                        }
                      />
                    </Route>
                    <Route element={<RequireAuth />}>
                      <Route
                        path="sendFeedBack"
                        element={
                          <Suspense>
                            <Feedback />
                          </Suspense>
                        }
                      />
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
