import styled from 'styled-components';

export default styled.button`
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  margin: 0;

  outline: none;

  cursor: pointer;
  pointer-events: auto;

  background-color: transparent;

  &:active img {
    opacity: 0.7;
  }
`;
