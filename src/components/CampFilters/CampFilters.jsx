import React from 'react';
import { Filter } from '@gulag/ui-kit';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import { t } from '../../intl/helper';
import campsColors from '../../config/campsColors';

// styled
import Container from './styled/Container';
import Top from './styled/Top';
import Title from './styled/Title';
import Button from './Button';
import ContentWrapper from './ContentWrapper';

const CampFilters = props => {
  const {
    types,
    isCampFiltersOpen,
    campTypeFilters,
    toggleCampFilters,
    toggleFilter,
    locale
  } = props;

  return (
    <Container isOpen={isCampFiltersOpen}>
      <ContentWrapper>
        <Top>
          <Title>{t('campFilters.title')}</Title>
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
      </ContentWrapper>
      <Button onClick={toggleCampFilters} isOpen={isCampFiltersOpen}>
        <div />
        <div />
        <div />
      </Button>
    </Container>
  );
};

CampFilters.propTypes = {
  types: PropTypes.instanceOf(List).isRequired,
  isCampFiltersOpen: PropTypes.bool.isRequired,
  toggleCampFilters: PropTypes.func.isRequired,
  campTypeFilters: PropTypes.instanceOf(Map).isRequired,
  toggleFilter: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

export default CampFilters;
