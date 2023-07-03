import {
  Container,
  Wrapper,
  Close,
  Title,
  Content,
  Footer,
  Button,
  Hr,
} from "./AlertStyled";

const Alert = (props) => {
  return (
    <Container>
      <Wrapper>
        <Title>
          {props.title}
          <Close
            onClick={() =>
              props.setShowAlert
                ? props.setShowAlert(false)
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
              props.setShowAlert
                ? props.setShowAlert(false)
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

export default Alert;
