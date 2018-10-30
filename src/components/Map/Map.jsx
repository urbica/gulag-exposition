import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import Immutable, { List } from 'immutable';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';

import mapConfig from '../../config/map';
import layersConfig from '../../config/layers';

// component
import Popup from '../Popup/Popup';
import MapControls from '../MapControls';

// styled
import Container from './styled/Container';

class Map extends PureComponent {
  mapGlRef = React.createRef();

  static propTypes = {
    isSlideUp: PropTypes.bool.isRequired,
    viewport: PropTypes.instanceOf(Immutable.Map).isRequired,
    campsSource: PropTypes.instanceOf(Immutable.Map).isRequired,
    changeViewport: PropTypes.func.isRequired,
    openCampCard: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    closeCampCard: PropTypes.func.isRequired
  };

  state = {
    layers: layersConfig,
    isMapLoaded: false
  };

  componentDidMount() {
    this.map = this.mapGlRef.current.getMap();
    this.map.touchZoomRotate.disableRotation();
    this.map.on('click', this.onMapClick);
  }

  componentDidUpdate() {
    const { isMapLoaded } = this.state;

    if (isMapLoaded) {
      this.translateLayers();
    }
  }

  onMapClick = e => {
    const { closeCampCard } = this.props;

    const features = this.map.queryRenderedFeatures(e.point, {
      layers: ['campsHalo']
    });

    if (features.length === 0) {
      closeCampCard();
    }
  };

  onLayerClick = e => {
    if (e.features.length > 1) {
      const div = document.createElement('div');
      ReactDom.render(
        <Popup features={e.features} onClick={this.openCampCardHandler} />,
        div
      );

      this.popup = new mapboxgl.Popup({
        closeButton: false,
        anchor: 'left',
        offset: 40
      })
        .setLngLat(e.features[0].geometry.coordinates)
        .setDOMContent(div)
        .addTo(this.mapGlRef.current.getMap());
    } else {
      this.openCampCardHandler(e.features[0].properties.campId);
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentYear, lang, campId } = nextProps;

    const ussrBoundaryFilter = List([
      'all',
      ['<=', 'year_start', currentYear],
      ['>=', 'year_end', currentYear]
    ]);
    const citiesFilter = List(['all', ['==', 'year', currentYear]]);
    const citiesNames = `{historical_name${lang === 'ru' ? '' : '_en'}}`;
    const activeCampHaloFilter = List([
      'all',
      ['==', 'campId', parseInt(campId, 10)],
      ['==', 'year', currentYear]
    ]);
    const activeCampNameFilter = List([
      'all',
      ['==', 'campId', parseInt(campId, 10)],
      ['==', 'year', currentYear]
    ]);
    const campsFilter = List(['all', ['==', 'year', currentYear]]);
    const campsHaloFilter = List(['all', ['==', 'year', currentYear]]);

    const updatedLayers = prevState.layers
      .setIn(['ussrBoundary', 'filter'], ussrBoundaryFilter)
      .setIn(['cities', 'filter'], citiesFilter)
      .setIn(['citiesDots', 'filter'], citiesFilter)
      .setIn(['cities', 'layout', 'text-field'], citiesNames)
      .setIn(['campHalo_active', 'filter'], activeCampHaloFilter)
      .setIn(['campName_active', 'filter'], activeCampNameFilter)
      .setIn(['camps', 'filter'], campsFilter)
      .setIn(['campsHalo', 'filter'], campsHaloFilter);

    return { layers: updatedLayers };
  }

  translateLayers = () => {
    const { lang } = this.props;

    const translatedLayers = [
      'marine-label-others-line',
      'marine-label-others',
      'marine-sea-line',
      'marine-sea',
      'oceans',
      'water-label',
      'ussr-name'
    ];

    translatedLayers.forEach(layer => {
      this.map.setLayoutProperty(layer, 'text-field', `{name_${lang}}`);
    });
  };

  openCampCardHandler = campId => {
    const { openCampCard } = this.props;

    if (this.popup) {
      this.popup.remove();
    }
    openCampCard(campId);
  };

  mapOnLoad = () => {
    this.setState({ isMapLoaded: true });
  };

  render() {
    const { layers } = this.state;
    const { isSlideUp, viewport, changeViewport, campsSource } = this.props;
    const zoom = viewport.get('zoom');

    const zoomIn = () => changeViewport({ zoom: zoom + 1 });
    const zoomOut = () => changeViewport({ zoom: zoom - 1 });

    return (
      <Container slideUp={isSlideUp}>
        <MapGL
          ref={this.mapGlRef}
          style={{ width: '100%', height: '100%' }}
          onViewportChange={changeViewport}
          onLoad={this.mapOnLoad}
          {...mapConfig}
          {...viewport.toJS()}
        >
          <Source id='camps' source={campsSource} />
          <Layer layer={layers.get('ussrBoundary')} before='waterway-z3' />
          <Layer layer={layers.get('cities')} />
          <Layer layer={layers.get('citiesDots')} />
          <Layer layer={layers.get('campsHalo')} onClick={this.onLayerClick} />
          <Layer layer={layers.get('camps')} />
          <Layer layer={layers.get('campsNames')} />
          <Layer layer={layers.get('campHalo_active')} />
          <Layer layer={layers.get('campName_active')} />
        </MapGL>
        <MapControls zoomIn={zoomIn} zoomOut={zoomOut} />
      </Container>
    );
  }
}

export default Map;
