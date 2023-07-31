import {
  Container,
  Wrapper,
  Close,
  Title,
  Content,
  Hr,
} from "./ShareMediaStyled";
import { FacebookShareButton, TelegramShareButton, TwitterShareButton, FacebookIcon, TelegramIcon, TwitterIcon, } from 'react-share';

const ShareMedia = (props) => {
  const location = window.location.href;

  return (
    <Container>
      <Wrapper>
        <Title>
          Share
          <Close
            onClick={() =>
              props.setShowShareMedia ? props.setShowShareMedia(false) : null
            }
          >
            X
          </Close>
        </Title>
        <Hr />
        <Content>
          <FacebookShareButton url={location}>
            <FacebookIcon size={50} round />
            <p>Facebook</p>
          </FacebookShareButton>

          <TwitterShareButton url={location}>
            <TwitterIcon size={50} round />
            <p>Twitter</p>
          </TwitterShareButton>

          <TelegramShareButton url={location}>
            <TelegramIcon size={50} round />
            <p>Telegram</p>
          </TelegramShareButton>
          
        </Content>
      </Wrapper>
    </Container>
  );
};

export default ShareMedia;
