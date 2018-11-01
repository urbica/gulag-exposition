import styled from 'styled-components';
import { defaultBackground, mainFontColour } from '../../config/styles';

export default styled.button`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(100% + 20px);

  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 50%;
  margin: 0;

  outline: none;

  background-color: ${defaultBackground};

  & div {
    width: ${({ isOpen }) => (isOpen ? '25px' : '20px')};
    height: 2px;
    margin: 5px auto;

    background: ${mainFontColour};

    transition: all 400ms ease;

    &:first-child {
      transform: translateY(${({ isOpen }) => (isOpen ? '7px' : 0)})
        rotateZ(${({ isOpen }) => (isOpen ? '45deg' : 0)});
    }

    &:nth-child(2) {
      width: ${({ isOpen }) => (isOpen ? 0 : '20px')};
      margin: 0 auto;
    }

    &:last-child {
      transform: translateY(${({ isOpen }) => (isOpen ? '-7px' : 0)})
        rotateZ(${({ isOpen }) => (isOpen ? '-45deg' : 0)});
    }
  }
`;
