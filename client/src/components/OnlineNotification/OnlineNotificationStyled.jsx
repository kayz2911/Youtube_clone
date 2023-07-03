import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  border-radius: 10px;
  right: ${({ showNotification }) => (showNotification ? "20px" : "-300px")};
  transition: right 0.3s ease-in-out;
  ${({ showNotification }) =>
    showNotification
      ? css`
          animation: ${slideIn} 0.3s ease-in-out;
          animation-fill-mode: forwards;
        `
      : css`
          animation: ${slideOut} 0.3s ease-in-out;
          animation-fill-mode: backwards;
        `};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 15px;
`;