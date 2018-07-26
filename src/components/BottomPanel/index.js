import createImmutableSelector from 'create-immutable-selector';
import { connect } from 'react-redux';

// selectors
import { currentYearSelector } from '../App/reducers/uiReducer';

// action
import { changeCurrentYear } from '../App/reducers/uiActions';

import BottomPanel from './BottomPanel';

const mapStateToProps = createImmutableSelector(
  currentYearSelector,
  currentYear => ({ currentYear })
);

export default connect(
  mapStateToProps,
  { changeCurrentYear }
)(BottomPanel);
