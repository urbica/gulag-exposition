import { fromJS, List, Map } from 'immutable';
import createImmutableSelector from 'create-immutable-selector';

import viewport from '../../../config/initialViewport';

// utils
import emptyGeoJSONSource from '../../../utils/emptyGeoJSONSource';

// selectors
import { filteredCampsSelector } from './dataReducer';
import { localeSelector } from './intlReducer';

// action
import { VIEWPORT_CHANGED } from './mapActions';

// initial state
const initState = fromJS({ viewport });

// selectors
const mapSelector = createImmutableSelector(
  state => state.get('map'),
  map => map
);
export const viewportSelector = createImmutableSelector(mapSelector, map =>
  map.get('viewport')
);
// TODO refactor campsSourceSelector
export const campsSourceSelector = createImmutableSelector(
  filteredCampsSelector,
  localeSelector,
  (camps, locale) => {
    const features = camps.reduce((accCamps, camp) => {
      const locations = camp
        .get('locations')
        .reduce((accLocations, location) => {
          const statistics = location.get('statistics');

          const feature = Map({
            type: 'Feature',
            geometry: location.get('geometry'),
            properties: {
              campId: camp.get('id'),
              name: camp.getIn(['title', locale]),
              typeId: camp.get('typeId')
            }
          });

          if (statistics === undefined) return accLocations;

          const featureWithPeoples = statistics.map(statistic =>
            feature
              .setIn(['properties', 'peoples'], statistic.get('prisonersCount'))
              .setIn(['properties', 'year'], statistic.get('year'))
          );

          return accLocations.merge(featureWithPeoples);
        }, List());

      return accCamps.merge(locations);
    }, List());

    return emptyGeoJSONSource.setIn(['data', 'features'], features);
  }
);

// reducer
export default (state = initState, { type, payload }) => {
  switch (type) {
    case VIEWPORT_CHANGED:
      return state.update('viewport', previousViewport =>
        previousViewport.merge(payload)
      );
    default:
      return state;
  }
};
