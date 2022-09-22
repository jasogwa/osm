import styled from "styled-components";

export const Container = styled.div`
  right: 0;
  top: 0;
  position: absolute;
  height: 35%;
  width: 200px;
  z-index: 10000;
  padding: 2px 0px;
  background-color: #ffffff;
  opacity: 0.6;
`;

export const Wapper = styled.div`
  margin-left: 0 10px 10px 0;
  color: #000000;
  align-content: center;
  padding: 10px;
`;

export const CenterBG = styled.span`
  background-color: black;
  color: white;
`;

export const Form = styled.form``;

export const Button = styled.button`
  text-align: center;
  cursor: pointer;
  background-color: #008cba;
  border: none;
  color: white;
  padding: 10px 24px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

export const Input = styled.input`
  flex: 1;
  width: 95%;
  margin-bottom: 3px;
`;

export const Error = styled.div`
  color: red;
  font-weight: 600;
`;

export const Label = styled.div`
  color: green;
`;