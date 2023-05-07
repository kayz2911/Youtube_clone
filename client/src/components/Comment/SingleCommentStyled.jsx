import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

export const Text = styled.span`
  font-size: 14px;
`;

export const Button = styled.button`
  margin-top: 8px;
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid red;
  color: red;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  align-items: center;
  display: flex;
  max-height: 30px;
`;
