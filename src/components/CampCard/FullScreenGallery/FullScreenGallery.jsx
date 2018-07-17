import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

// icon
import cross from '../../cross.svg';

// styled
import Container from './styled/Container';
import Wrapper from './styled/Wrapper';
import Main from './styled/Main';
import Gallery from './styled/Gallery';
import Img from './styled/Img';
import LeftArrow from './styled/LeftArrow';
import RightArrow from './styled/RightArrow';
import CardButton from '../styled/CardButton';

const FullScreenGallery = props => {
  const {
    photos,
    isOpened,
    handleToggleVisible,
    handleClickActive,
    handleClick,
    active
  } = props;

  return (
    <Container isOpened={isOpened}>
      <Wrapper onClick={handleToggleVisible} />
      <Main isOpened={isOpened}>
        <img src={photos.getIn([active, 'src'])} alt='' />
        {photos.getIn([active, 'description-ru']) !== '' && (
          <article>
            <span>
              {photos.getIn([active, 'description-ru'])}
            </span>
          </article>
        )}
      </Main>
      <Gallery>
        <div>
          {photos.map((photo, i) => (
            <Img
              key={photo.count}
              src={photo.src}
              alt='photo'
              onClick={() => handleClickActive(i)}
              isActive={i === active}
            />
          ))}
        </div>
      </Gallery>
      <LeftArrow onClick={() => handleClick(true)} />
      <RightArrow onClick={() => handleClick(false)} />
      <CardButton onClick={handleToggleVisible}>
        <img src={cross} alt='cross' />
      </CardButton>
    </Container>
  );
};

FullScreenGallery.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  photos: PropTypes.instanceOf(List).isRequired,
  handleToggleVisible: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
  handleClickActive: PropTypes.func.isRequired
};

export default FullScreenGallery;
