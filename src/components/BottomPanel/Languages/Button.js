import styled from 'styled-components';
import { defaultBackground, mainFontColour } from '../../../config/styles';

export default styled.button`
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 50%;
  margin: 0;

  outline: none;

  color: ${mainFontColour};
  text-transform: capitalize;

  background-color: ${defaultBackground};

  pointer-events: auto;
`;
