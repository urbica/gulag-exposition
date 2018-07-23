import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { t } from '../../intl/helper';

// icon
import cross from '../cross.svg';

// styled
import Container from './Container';
import Top from './Top';
import Title from './Title';
import CloseButton from './BackButton';
import Filter from './Filter';
import FilterTop from './FilterTop';
import FilterTitle from './FilterTitle';
import Switcher from './Switcher';
import Description from './Description';

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

        return (
          <Filter key={type.get('id')} onClick={toggleFilterHandler}>
            <FilterTop>
              <FilterTitle isActive={isActive}>
                {type.getIn(['title', locale])}
              </FilterTitle>
              <Switcher typeId={type.get('id')} isActive={isActive} />
            </FilterTop>
            <Description isActive={isActive}>
              {type.getIn(['description', locale])}
            </Description>
          </Filter>
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
