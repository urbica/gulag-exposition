import createImmutableSelector from 'create-immutable-selector';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// selectors
import {
  viewportSelector,
  campsSourceSelector
} from '../App/reducers/mapReducer';
import { currentYearSelector } from '../App/reducers/uiReducer';
import { localeSelector } from '../App/reducers/intlReducer';

// actions
import { changeViewport } from '../App/reducers/mapActions';

import Map from './Map';

const mapStateToProps = createImmutableSelector(
  state => state.getIn(['router']).location.pathname,
  currentYearSelector,
  viewportSelector,
  campsSourceSelector,
  localeSelector,
  (pathname, currentYear, viewport, campsSource, lang) => ({
    isSlideUp: /\/camp/.test(pathname),
    currentYear,
    viewport,
    campsSource,
    lang,
    campId: pathname.match(/\d+/) ? pathname.match(/\d+/)[0] : ''
  })
);

const mapDispatchToProps = dispatch => ({
  changeViewport: newViewport => dispatch(changeViewport(newViewport)),
  openCampCard: id => {
    dispatch(push(`/camp${id}`));
  },
  closeCampCard: () => {
    dispatch(push('/'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
