import transition from 'styled-transition-group';

export default transition.div`
  position: fixed;
  left: ${({ isCampFiltersOpen }) => (isCampFiltersOpen ? 0 : '-400px')};

  width: 400px;
  height: 100vh;
  padding: 40px;

  background-color: #14171a;

  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  
  z-index: 2;

  &:enter {
    left: -400px;
  }

  &:enter-active {
    left: 0;

    transition: left 250ms ease-in-out;
  }

  &:exit {
    left: 0;
  }

  &:exit-active {
    left: -400px;

    transition: left 250ms ease-in-out;
  }
`;
