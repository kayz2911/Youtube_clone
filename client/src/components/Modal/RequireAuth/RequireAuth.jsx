import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Wrapper,
  Close,
  Title,
  Content,
  Footer,
  ButtonCancel,
  ButtonLogin,
  Hr,
} from "./RequireAuthStyled";

const RequireAuth = (props) => {
  const navigate = useNavigate();
  const path = useLocation();
  const currentUser = useSelector((state) => state.user);
  const pathMustRequireAuth = ["/subscribeVideo", "/myVideo", "/likedVideo", "/sendFeedback"];

  if (!currentUser.currentUser?.accessToken) {
    return (
      <Container>
        <Wrapper>
          <Title>
            Authentication
            {pathMustRequireAuth.includes(path.pathname) ? null : (
              <Close
                onClick={() =>
                  props.setShowRequireAuthModal
                    ? props.setShowRequireAuthModal(false)
                    : null
                }
              >
                X
              </Close>
            )}
          </Title>
          <Hr />
          <Content>You need to sign in</Content>
          <Hr />
          <Footer>
            {pathMustRequireAuth.includes(path.pathname) ? null : (
              <ButtonCancel
                onClick={() =>
                  props.setShowRequireAuthModal
                    ? props.setShowRequireAuthModal(false)
                    : null
                }
              >
                Cancel
              </ButtonCancel>
            )}

            <ButtonLogin onClick={() => navigate("/login")}>Login</ButtonLogin>
          </Footer>
        </Wrapper>
      </Container>
    );
  }

  return <Outlet />;
};

export default RequireAuth;
