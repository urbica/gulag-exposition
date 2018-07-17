import styled from 'styled-components';
import fadeIn from './fadeIn';

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: ${({ isOpened }) => (isOpened ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100vh;

  opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
  background: rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.5s ease-in-out;
  animation-fill-mode: forwards;
  z-index: 1000;
`;
