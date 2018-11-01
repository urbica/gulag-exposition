/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// globalStyles
import './globalStyles';

// components
import Map from '../Map';
import Title from '../Title';
import BottomPanel from '../BottomPanel';
import CampFilters from '../CampFilters';
import CampCard from '../CampCard';

const App = () => (
  <Fragment>
    <Map />
    <Title />
    <BottomPanel />
    <CampFilters />
    <Route
      path='/camp:id'
      render={props => <CampCard key={props.match.params.id} {...props} />}
    />
  </Fragment>
);

export default App;
