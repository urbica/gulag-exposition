import React from 'react';
import { Filter } from '@gulag/ui-kit';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { t } from '../../intl/helper';
import campsColors from '../../config/campsColors';

// icon
import cross from '../cross.svg';

// styled
import Container from './styled/Container';
import Top from './styled/Top';
import Title from './styled/Title';
import CloseButton from './styled/CloseButton';

const CampFilters = props => {
  const {
    types,
    isCampFiltersOpen,
    closeCampFilters,
    campTypeFilters,
    toggleFilter,
    locale
  } = props;

  return (
    <Container
      mountOnEnter
      isCampFiltersOpen={isCampFiltersOpen}
      in={isCampFiltersOpen}
      timeout={250}
    >
      <Top>
        <Title>
          {t('campFilters.title')}
        </Title>
        <CloseButton onClick={closeCampFilters}>
          <img src={cross} alt='close' />
        </CloseButton>
      </Top>
      {types.map(type => {
        const typeId = type.get('id').toString();
        const isActive = campTypeFilters.get(typeId);
        const toggleFilterHandler = () => toggleFilter(typeId);
        const filter = {
          title: type.getIn(['title', locale]),
          description: type.getIn(['description', locale]),
          isActive,
          color: campsColors[type.get('id')]
        };

        return (
          <Filter
            key={type.get('id')}
            data={filter}
            onChange={toggleFilterHandler}
          />
        );
      })}
    </Container>
  );
};

CampFilters.propTypes = {
  types: PropTypes.instanceOf(Map).isRequired,
  isCampFiltersOpen: PropTypes.bool.isRequired,
  closeCampFilters: PropTypes.func.isRequired,
  campTypeFilters: PropTypes.instanceOf(Map).isRequired,
  toggleFilter: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

export default CampFilters;
