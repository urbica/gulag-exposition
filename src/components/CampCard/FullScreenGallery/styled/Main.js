import styled from 'styled-components';
import fadeIn from './fadeIn';

export default styled.div`
  top: 10vh;
  height: 60vh;
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    max-height: 100%;
    max-width: 100%;
    opacity: 0;
    animation: ${fadeIn} 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }

  article {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.8rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(0, 0, 0, 0.85);
    word-wrap: break-word;
    overflow: hidden;
  }

  span {
    color: #fff;
  }
`;
