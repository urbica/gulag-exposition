import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  from {
    top: 100vh;
  }
  to {
    top: 30%;
  }
`;

export default styled.div`
  position: absolute;
  top: 30%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100vw;
  min-height: 70%;
  padding: 40px 40px 80px 40px;
  background-color: #14171a;
  animation: ${animation} 0.4s linear;
  animation-fill-mode: forwards;
  overflow: scroll;
  transition: 0.4s;
  z-index: 1;
`;
