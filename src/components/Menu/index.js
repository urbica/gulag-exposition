import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// action
import { toggleCampFilters } from '../App/reducers/uiActions';

import Menu from './Menu';

const mapStateToProps = state => ({
  isDataLoading: state.getIn(['ui', 'isDataLoading']),
  lang: state.getIn(['intl', 'locale'])
});
const mapDispatchToProps = dispatch => ({
  onClick: () => {
    push('/');
    dispatch(toggleCampFilters());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
