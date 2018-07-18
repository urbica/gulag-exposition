import createImmutableSelector from 'create-immutable-selector';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';

// selectors
import { localeSelector } from '../App/reducers/intlReducer';
import { campSelector, activitiesSelector } from '../App/reducers/dataReducer';

// actions
import { changeViewport } from '../App/reducers/mapActions';

import CampCard from './CampCard';

const mapStateToProps = createImmutableSelector(
  localeSelector,
  campSelector,
  activitiesSelector,
  (lang, camp, activities) => ({
    lang,
    camp,
    activities
  })
);
const mapDispatchToProps = dispatch => ({
  closeCard: () => dispatch(push('/')),
  changeViewport: newViewport => dispatch(changeViewport(newViewport))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withBranch = branch(({ camp }) => !camp, renderNothing);

const enhance = compose(
  withConnect,
  withBranch
);
export default enhance(CampCard);
