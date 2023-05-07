import {
  Container,
  Wrapper,
  Close,
  Title,
  Content,
  Footer,
  Button,
  Hr,
} from "./NotificationStyled";

const Notification = (props) => {
  return (
    <Container>
      <Wrapper>
        <Title>
          {props.title}
          <Close
            onClick={() =>
              props.setShowNotification
                ? props.setShowNotification(false)
                : null
            }
          >
            X
          </Close>
        </Title>
        <Hr />
        <Content>{props.content}</Content>
        <Hr />
        <Footer>
          <Button
            onClick={() =>
              props.setShowNotification
                ? props.setShowNotification(false)
                : null
            }
          >
            Ok
          </Button>
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default Notification;
