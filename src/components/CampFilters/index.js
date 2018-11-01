import createImmutableSelector from 'create-immutable-selector';
import { connect } from 'react-redux';

// selectors
import { typesSelector } from '../App/reducers/dataReducer';
import {
  isCampFiltersOpenSelector,
  campTypeFiltersSelector
} from '../App/reducers/uiReducer';
import { localeSelector } from '../App/reducers/intlReducer';

// actions
import {
  toggleCampFilters,
  toggleCampTypeFilters
} from '../App/reducers/uiActions';

import CampFilters from './CampFilters';

const mapStateToProps = createImmutableSelector(
  typesSelector,
  isCampFiltersOpenSelector,
  campTypeFiltersSelector,
  localeSelector,
  (types, isCampFiltersOpen, campTypeFilters, locale) => ({
    types,
    isCampFiltersOpen,
    campTypeFilters,
    locale
  })
);
const mapDispatchToProps = dispatch => ({
  toggleFilter: id => dispatch(toggleCampTypeFilters(id)),
  toggleCampFilters: () => dispatch(toggleCampFilters())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampFilters);
