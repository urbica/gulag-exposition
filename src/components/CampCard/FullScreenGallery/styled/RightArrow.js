import styled from 'styled-components';

import arrow from './arrow.svg';

export default styled.div`
  position: absolute;
  top: 45%;
  right: 0;

  width: 5vw;
  height: 5vw;

  background: url(${arrow}) no-repeat 50% 50%;
  background-size: 30%;

  opacity: 1;
`;
