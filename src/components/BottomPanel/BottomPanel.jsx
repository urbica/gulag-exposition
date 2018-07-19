import React from 'react';
import PropTypes from 'prop-types';

import { Chart } from '@gulag/ui-kit';

import { margin, chartData } from './config';

// styled
import Container from './styled/Container';

const BottomPanel = ({ currentYear }) => (
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

BottomPanel.propTypes = {
  currentYear: PropTypes.number.isRequired
};

export default BottomPanel;
