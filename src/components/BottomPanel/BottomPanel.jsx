import React, { PureComponent } from 'react';
import { ChartStat, Chart } from '@gulag/ui-kit';
import PropTypes from 'prop-types';

import splitDigits from '../../utils/splitDigits';
import { t } from '../../intl/helper';

import { margin, chartData } from './config';

// styled
import Container from './styled/Container';
import Languages from './Languages';

const minScale = -1;
const maxScale = 1;
const shiftScale = 1;
const minYear = 1918;
const maxYear = 1960;

const coefficient =
  (maxYear - minYear) / (maxScale + shiftScale - (minScale + shiftScale));

const chartStats = chartData.reduce((acc, { year, prisoners, dead }) => {
  acc[year] = {
    prisoners: prisoners > 0 ? splitDigits(prisoners) : t('noData'),
    dead: dead > 0 ? splitDigits(dead) : t('noData')
  };

  return acc;
}, {});

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

    // if (e.axis !== 'RIGHT_STICK_X') return;
    const year = Math.round(minYear + (e.value + shiftScale) * coefficient);

    if (currentYear === year) return;

    changeCurrentYear(year);
  };

  xFunc = d => d.year;

  y1Func = d => d.dead;

  y2Func = d => d.prisoners;

  render() {
    const { currentYear } = this.props;
    const { prisoners, dead } = chartStats[currentYear];

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
        <div style={{ position: 'absolute', left: 0 }}>
          <ChartStat stats={stats} />
        </div>
        <Chart
          data={chartData}
          width={1140}
          height={200}
          margin={margin}
          value={currentYear}
          x={this.xFunc}
          y1={this.y1Func}
          y2={this.y2Func}
        />
        <Languages />
      </Container>
    );
  }
}

export default BottomPanel;
