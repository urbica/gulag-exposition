import React, { PureComponent } from 'react';
import { ChartStat, Chart } from '@gulag/ui-kit';
import PropTypes from 'prop-types';

import { t } from '../../intl/helper';
import * as constants from '../../config/constants';

// styled
import Container from './Container';
import Left from './Left';
import Middle from './Middle';
import Right from './Right';
import Languages from './Languages';

class BottomPanel extends PureComponent {
  static propTypes = {
    currentYear: PropTypes.number.isRequired,
    changeCurrentYear: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);

    this.left = searchParams.get('left');
    this.width = Number.parseInt(searchParams.get('width'), 10);
  }

  componentDidMount() {
    const gamepad = new Gamepad();
    gamepad.bind(Gamepad.Event.AXIS_CHANGED, this.gamepadOnChange);
    gamepad.init();
  }

  gamepadOnChange = e => {
    // e.axis changed to value e.value for gamepad e.gamepad
    const { currentYear, changeCurrentYear } = this.props;

    // if (e.axis !== 'RIGHT_STICK_X') return;
    const year = Math.round(
      constants.MIN_YEAR +
        (e.value + constants.SHIFT_SCALE) * constants.COEFFICIENT
    );

    if (currentYear === year) return;

    changeCurrentYear(year);
  };

  xFunc = d => d.year;

  y1Func = d => d.dead;

  y2Func = d => d.prisoners;

  render() {
    const { currentYear } = this.props;
    const { prisoners, dead } = constants.CHART_STATS[currentYear];
    const stats = [
      {
        id: 'prisoners',
        value: prisoners,
        description: t('prisoners'),
        lineColor: '#e2f3e3'
      },
      {
        id: 'dead',
        value: dead,
        description: t('dead'),
        lineColor: '#ae2817'
      }
    ];

    return (
      <Container>
        <Left>
          <ChartStat stats={stats} />
        </Left>
        <Middle left={this.left}>
          <Chart
            data={constants.CHART_DATA}
            width={this.width}
            height={200}
            margin={constants.MARGIN}
            value={currentYear}
            x={this.xFunc}
            y1={this.y1Func}
            y2={this.y2Func}
          />
        </Middle>
        <Right>
          <Languages />
        </Right>
      </Container>
    );
  }
}

export default BottomPanel;
