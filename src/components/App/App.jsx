/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// globalStyles
import './globalStyles';

// components
import Map from '../Map';
import Menu from '../Menu';
import Languages from '../Languages';
import BottomPanel from '../BottomPanel';
import CampFilters from '../CampFilters';
import CampCard from '../CampCard';

const App = () => (
  <Fragment>
    <Map />
    <Menu />
    <Languages />
    <BottomPanel />
    <CampFilters />
    <Route
      path='/camp:id'
      render={props => <CampCard key={props.match.params.id} {...props} />}
    />
  </Fragment>
);

export default App;
