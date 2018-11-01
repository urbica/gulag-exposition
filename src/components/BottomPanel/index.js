import createImmutableSelector from 'create-immutable-selector';
import { connect } from 'react-redux';

// selectors
import { currentYearSelector } from '../App/reducers/uiReducer';
import { localeSelector } from '../App/reducers/intlReducer';

// action
import { changeCurrentYear } from '../App/reducers/uiActions';

import BottomPanel from './BottomPanel';

const mapStateToProps = createImmutableSelector(
  currentYearSelector,
  localeSelector,
  (currentYear, locale) => ({ currentYear, locale })
);

export default connect(
  mapStateToProps,
  { changeCurrentYear }
)(BottomPanel);
