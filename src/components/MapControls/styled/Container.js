import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  position: fixed;
  top: calc(50% - 76px);
  right: 20px;

  width: 50px;
  height: 100px;
  border-radius: 25.5px;

  background-color: rgb(20, 23, 26);

  z-index: 1;
`;
