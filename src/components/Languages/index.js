import createImmutableSelector from 'create-immutable-selector';
import { updateIntl } from 'react-intl-redux';
import { connect } from 'react-redux';

import { localeSelector } from '../App/reducers/intlReducer';

import en from '../../intl/en';
import ru from '../../intl/ru';

import Languages from './Languages';

const locales = { en, ru };

const mapStateToProps = createImmutableSelector(localeSelector, locale => ({
  locale
}));
const mapDispatchToProps = dispatch => ({
  updateIntlHandler: lang => () =>
    dispatch(updateIntl({ locale: lang, messages: locales[lang].messages }))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(Languages);
