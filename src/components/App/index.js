import createImmutableSelector from 'create-immutable-selector';
import { connect } from 'react-redux';

// selector
import { currentYearSelector } from './reducers/uiReducer';

// action
import { changeCurrentYear } from './reducers/uiActions';

// component
import App from './App';

const mapStateToProps = createImmutableSelector(
  currentYearSelector,
  currentYear => ({ currentYear })
);

export default connect(
  mapStateToProps,
  { changeCurrentYear }
)(App);
