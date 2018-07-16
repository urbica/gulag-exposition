import React from 'react';
import PropTypes from 'prop-types';

// icons
import plus from './plus.svg';
import minus from './minus.svg';

// styled
import Container from './styled/Container';
import Button from './styled/Button';

const MapControls = ({ zoomIn, zoomOut }) => (
  <Container>
    <Button onClick={zoomIn}>
      <img src={plus} alt='plus' />
    </Button>
    <Button onClick={zoomOut}>
      <img src={minus} alt='minus' />
    </Button>
  </Container>
);

MapControls.propTypes = {
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired
};

export default MapControls;
