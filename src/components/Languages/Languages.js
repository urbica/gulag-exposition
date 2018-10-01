import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';

const languages = ['ru', 'en'];

const Languages = ({ updateIntlHandler }) => (
  <Container>
    {languages.map(language => (
      <button
        type='button'
        key={language}
        onClick={updateIntlHandler(language)}
      >
        {language}
      </button>
    ))}
  </Container>
);

Languages.propTypes = {
  updateIntlHandler: PropTypes.func.isRequired
};

export default Languages;
