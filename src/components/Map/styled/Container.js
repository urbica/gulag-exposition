import styled from 'styled-components';

export default styled.div`
  position: fixed;
  top: 0;
  bottom: 0;

  width: 100%;

  transform: translateY(${({ slideUp }) => (slideUp ? '-30%' : '0')});
  transition: 0.4s;

  .mapboxgl-ctrl-attrib {
    opacity: 0.3;
    background-color: inherit;
  }

  .mapboxgl-popup-tip {
    display: none;
  }

  .mapboxgl-popup-content {
    padding: 0 !important;
    border: none !important;
    background: inherit !important;
    box-shadow: none !important;
  }
`;
