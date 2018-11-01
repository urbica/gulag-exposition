import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import Button from './Button';

const languages = {
  ru: 'en',
  en: 'ru'
};

const Languages = ({ updateIntlHandler, locale }) => (
  <Container>
    <Button type='button' onClick={updateIntlHandler(languages[locale])}>
      {languages[locale]}
    </Button>
  </Container>
);

Languages.propTypes = {
  locale: PropTypes.string.isRequired,
  updateIntlHandler: PropTypes.func.isRequired
};

export default Languages;
