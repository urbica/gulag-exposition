import React from 'react';
import { ButtonWithTitle } from '@gulag/ui-kit';
import PropTypes from 'prop-types';

import { t } from '../../intl/helper';

// styled
import Container from './styled/Container';

const Menu = ({ onClick }) => (
  <Container>
    <ButtonWithTitle onClick={onClick}>
      {t('menu.title')}
    </ButtonWithTitle>
  </Container>
);

Menu.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Menu;
