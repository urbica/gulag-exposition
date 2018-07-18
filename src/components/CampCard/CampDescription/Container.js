import styled from 'styled-components';
import { mainFontColour } from '../../../config/styles';

export default styled.div`
  h2 {
    margin-top: 0;
    margin-bottom: 10px;

    font-size: 17px;
    font-weight: bold;
  }

  p {
    margin-bottom: 40px;

    line-height: 1.7;
  }

  a {
    color: ${mainFontColour};
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }
`;
