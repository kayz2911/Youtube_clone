import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  min-width: 240px;
  border-radius: 20px;
  position: fixed;
  top: 50px;
  right: 115px;
`;

export const Wrapper = styled.div`
  padding: 0px 10px;
`;

export const NotificationInfo = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  margin: 10px 0px;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export const NotificationText = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;
