import { fromJS } from 'immutable';
import createImmutableSelector from 'create-immutable-selector';
import { UPDATE } from 'react-intl-redux';

import ruLocale from '../../../intl/ru';

const initialState = fromJS(ruLocale);

// selectors
const intlSelector = createImmutableSelector(
  state => state.get('intl'),
  intl => intl
);
export const localeSelector = createImmutableSelector(intlSelector, intl =>
  intl.get('locale')
);

// reducer
export default (state = initialState, action) => {
  if (action.type !== UPDATE) {
    return state;
  }

  return state.merge(action.payload);
};
