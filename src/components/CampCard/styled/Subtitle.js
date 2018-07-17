import styled from 'styled-components';

export default styled.h2`
  margin: 0 0 5px 0;

  font-size: 17px;
  font-weight: bold;

  & + div {
    margin-bottom: 40px;

    line-height: 1.7;
  }
`;
