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
  const pathMustRequireAuth = ["/subscriptionVideo"];

  if (!currentUser.currentUser?.accessToken) {
    return (
      <Container>
        <Wrapper>
          <Title>
            Authentication
            {pathMustRequireAuth.includes(path.pathname) ? (
              ""
            ) : (
              <Close
                onClick={() =>
                  props.setShowRequireAuthModal
                    ? props.setShowRequireAuthModal(false)
                    : ""
                }
              >
                X
              </Close>
            )}
          </Title>
          <Hr />
          <Content>You need to sign in to subscribe channel</Content>
          <Hr />
          <Footer>
            {path.pathname === "/subscriptionVideo" ? (
              ""
            ) : (
              <ButtonCancel
                onClick={() =>
                  props.setShowRequireAuthModal
                    ? props.setShowRequireAuthModal(false)
                    : ""
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
