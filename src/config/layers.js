import { fromJS } from 'immutable';
import campColors from './campsColors';
import { USSR_BOUNDARY, CITIES, CITIES_DOTS } from './sourceLayers';

export default fromJS({
  camps: {
    id: 'camps',
    type: 'circle',
    source: 'camps',
    paint: {
      'circle-radius': 1.75,
      'circle-color': [
        'match',
        ['get', 'typeId'],
        1,
        `rgb(${campColors[1]})`,
        2,
        `rgb(${campColors[2]})`,
        3,
        `rgb(${campColors[3]})`,
        4,
        `rgb(${campColors[4]})`,
        5,
        `rgb(${campColors[5]})`,
        6,
        `rgb(${campColors[6]})`,
        /* other */ '#ccc'
      ],
      'circle-opacity': 1
    }
  },
  campsHalo: {
    id: 'campsHalo',
    type: 'circle',
    interactive: true,
    source: 'camps',
    paint: {
      'circle-color': [
        'match',
        ['get', 'typeId'],
        1,
        `rgb(${campColors[1]})`,
        2,
        `rgb(${campColors[2]})`,
        3,
        `rgb(${campColors[3]})`,
        4,
        `rgb(${campColors[4]})`,
        5,
        `rgb(${campColors[5]})`,
        6,
        `rgb(${campColors[6]})`,
        /* other */ '#ccc'
      ],
      'circle-opacity': 0.2,
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        1,
        ['interpolate', ['linear'], ['get', 'peoples'], 0, 4, 200000, 20],
        18,
        ['interpolate', ['linear'], ['get', 'peoples'], 0, 32, 200000, 400]
      ]
    }
  },
  campsNames: {
    id: 'campsNames',
    type: 'symbol',
    source: 'camps',
    layout: {
      'text-field': '{name}',
      'text-size': {
        stops: [[0, 8], [4, 10], [6, 14], [12, 22], [22, 28]]
      },
      'text-anchor': 'left',
      'text-justify': 'left',
      'text-offset': [1.5, 0]
    },
    paint: {
      'text-color': '#fff'
    },
    filter: ['==', 'campId', '']
  },
  ussrBoundary: {
    id: 'ussrBoundary',
    type: 'fill',
    source: 'composite',
    'source-layer': USSR_BOUNDARY,
    paint: {
      'fill-color': '#1B2128',
      'fill-antialias': false
    },
    filter: ['all', ['<=', 'year_start', 1937], ['>=', 'year_end', 1937]]
  },
  cities: {
    id: 'cities',
    type: 'symbol',
    source: 'composite',
    'source-layer': CITIES,
    layout: {
      'text-size': {
        base: 1,
        stops: [[0, 8], [4, 12], [6, 16], [12, 22], [22, 28]]
      },
      'text-transform': 'none',
      'text-font': ['PT Sans Regular'],
      'text-padding': 1,
      'text-offset': {
        base: 1,
        stops: [[0, [0, -0.1]], [6, [0, -0.3]]]
      },
      'text-anchor': 'bottom',
      'text-field': '{historical_name}'
    },
    paint: {
      'text-color': '#6A748C'
    },
    filter: ['all', ['==', 'year', 1937]]
  },
  citiesDots: {
    id: 'citiesDots',
    type: 'circle',
    source: 'composite',
    'source-layer': CITIES_DOTS,
    layout: {},
    paint: {
      'circle-color': '#6A748C',
      'circle-radius': {
        base: 1,
        stops: [[1, 1], [4, 1.3], [22, 1.3]]
      },
      'circle-opacity': {
        base: 1,
        stops: [[0, 1], [7, 1], [7.5, 0]]
      }
    },
    filter: ['all', ['==', 'year', 1937]]
  },
  campHalo_active: {
    id: 'campHalo_hover',
    type: 'circle',
    source: 'camps',
    paint: {
      'circle-color': [
        'match',
        ['get', 'typeId'],
        1,
        `rgb(${campColors[1]})`,
        2,
        `rgb(${campColors[2]})`,
        3,
        `rgb(${campColors[3]})`,
        4,
        `rgb(${campColors[4]})`,
        5,
        `rgb(${campColors[5]})`,
        6,
        `rgb(${campColors[6]})`,
        /* other */ '#ccc'
      ],
      'circle-opacity': 0.5,
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        1,
        ['interpolate', ['linear'], ['get', 'peoples'], 0, 4, 200000, 20],
        18,
        ['interpolate', ['linear'], ['get', 'peoples'], 0, 32, 200000, 400]
      ]
    },
    filter: ['==', 'campId', '']
  },
  campName_active: {
    id: 'campName_active',
    type: 'symbol',
    source: 'camps',
    layout: {
      'text-field': '{name}',
      'text-size': {
        stops: [[0, 8], [4, 10], [6, 14], [12, 22], [22, 28]]
      },
      'text-anchor': 'left',
      'text-justify': 'left',
      'text-offset': [1.5, 0]
    },
    paint: {
      'text-color': '#fff'
    },
    filter: ['==', 'campId', '']
  }
});
