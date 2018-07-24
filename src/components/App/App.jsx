import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// globalStyles
import './globalStyles';

// components
import Map from '../Map';
import Menu from '../Menu';
import BottomPanel from '../BottomPanel';
import CampFilters from '../CampFilters';
import CampCard from '../CampCard';

class App extends PureComponent {
  static propTypes = {
    currentYear: PropTypes.number.isRequired,
    changeCurrentYear: PropTypes.func.isRequired
  };

  componentDidMount() {
    const gamepad = new Gamepad();
    gamepad.bind(Gamepad.Event.AXIS_CHANGED, this.gamepadOnChange);
    gamepad.init();
  }

  gamepadOnChange = e => {
    // e.axis changed to value e.value for gamepad e.gamepad
    const { currentYear, changeCurrentYear } = this.props;
    // 0.02380952381 is scale interval
    const year = Math.round(e.value / 0.02380952381 + 1918);

    if (currentYear === year) return;

    changeCurrentYear(year);
  };

  render() {
    return (
      <Fragment>
        <Map />
        <Menu />
        <BottomPanel />
        <CampFilters />
        <Route
          path='/camp:id'
          render={props => <CampCard key={props.match.params.id} {...props} />}
        />
      </Fragment>
    );
  }
}

export default App;
