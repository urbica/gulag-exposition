import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Button from './Button';

const Popup = ({ features, onClick }) => (
  <Container>
    {features.map(f => {
      const onClickHandler = () => onClick(f.properties.campId);

      return (
        <Button key={f.properties.campId} onClick={onClickHandler}>
          {f.properties.name}
        </Button>
      );
    })}
  </Container>
);

Popup.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Popup;
