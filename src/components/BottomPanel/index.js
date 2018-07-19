import createImmutableSelector from 'create-immutable-selector';
import { connect } from 'react-redux';

// selectors
import { currentYearSelector } from '../App/reducers/uiReducer';

import BottomPanel from './BottomPanel';

const mapStateToProps = createImmutableSelector(
  currentYearSelector,
  currentYear => ({ currentYear })
);

export default connect(mapStateToProps)(BottomPanel);
