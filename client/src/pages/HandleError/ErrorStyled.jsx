import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`;

export const ErrorContent = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 30px;
`;
