import styled from 'styled-components';

export default styled.div`
  position: fixed;

  width: 400px;
  height: 100vh;

  transform: translateX(${({ isOpen }) => (isOpen ? 0 : '-400px')});
  transition: transform 400ms;

  z-index: 1;
`;
