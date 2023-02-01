import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 350px;
  height: 180px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Title = styled.div`
  font-size: 18px;
  padding: 10px;
  display: flex;
  align item: center;
  justify-content: space-between;
`;

export const Close = styled.div`
  cursor: pointer;
`;

export const Content = styled.div`
  padding: 10px 10px;
  text-align: left;
`;

export const Footer = styled.div`
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ButtonCancel = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 10px;
`;

export const ButtonLogin = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
`;

export const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
