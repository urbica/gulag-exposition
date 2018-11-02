import styled from 'styled-components';

export default styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 220px;

  pointer-events: none;
  z-index: 1;

  // this after element is need to prevent click on mapbox logo
  &:after {
    content: '';

    position: absolute;
    bottom: 0;

    width: 100%;
    height: 30px;

    pointer-events: auto;
  }
`;
