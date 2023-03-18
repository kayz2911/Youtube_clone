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
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

export const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

export const Description = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CheckboxOption = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  input[type="checkbox"] {
    display: none;
  }
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    vertical-align: middle;
    position: relative;
    &:after {
      content: "\\2713";
      color: #fff;
      font-size: 14px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.2s ease-in-out;
    }
  }
  input[type="checkbox"]:checked + span {
    background-color: #0077ff;
    border-color: #0077ff;
  }
  input[type="checkbox"]:checked + span:after {
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

export const Label = styled.label`
  font-size: 14px;
`;
