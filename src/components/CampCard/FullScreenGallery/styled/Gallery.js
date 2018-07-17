import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30vh;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    max-width: 90vw;
    height: 100%;

    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;
