import styled from 'styled-components';

export default styled.img`
  height: 50%;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.6')};
  cursor: pointer;
  margin-right: 0.8rem;
  z-index: 10;
`;
