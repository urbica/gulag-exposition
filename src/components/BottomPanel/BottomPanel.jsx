import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Chart } from '@gulag/ui-kit';

import { margin, chartData } from './config';

// styled
import Container from './styled/Container';

class BottomPanel extends PureComponent {
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
    const { currentYear } = this.props;

    return (
      <Container>
        <Chart
          data={chartData}
          width={1200}
          height={200}
          margin={margin}
          value={currentYear}
          x={d => d.year}
          y1={d => d.dead}
          y2={d => d.prisoners}
        />
      </Container>
    );
  }
}

export default BottomPanel;
