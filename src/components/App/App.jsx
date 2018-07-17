/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// globalStyles
import './globalStyles';

// components
import Map from '../Map';
import CampCard from '../CampCard';

const App = () => (
  <Fragment>
    <Map />
    <Route
      path='/camp:id'
      render={props => <CampCard key={props.match.params.id} {...props} />}
    />
  </Fragment>
);

export default App;
