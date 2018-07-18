import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

// utils
import { t } from '../../intl/helper';

// images
import cross from '../cross.svg';

// components
import YearsOfOperation from './YearsOfOperation/YearsOfOperation';
import CampDescription from './CampDescription/CampDescription';
import PrisonChart from './PrisonChart/PrisonChart';
import FullScreenGallery from './FullScreenGallery/FullScreenGallery';

// styled
import Container from './styled/Container';
import Top from './styled/Top';
import Location from './styled/Location';
import CardButton from './styled/CardButton';
import Left from './styled/Left';
import HalfWidth from './styled/HalfWidth';
import Subtitle from './styled/Subtitle';
import Right from './styled/Right';
import Bottom from './styled/Bottom';
import Gallery from './styled/Gallery';

const getList = arr =>
  arr.get('photos').map((photo, i) => ({
    'title-ru': photo.getIn(['title', 'ru']),
    'title-en': photo.getIn(['title', 'en']),
    'title-de': photo.getIn(['title', 'de']),
    'description-ru': photo.getIn(['description', 'ru']),
    'description-en': photo.getIn(['description', 'en']),
    'description-de': photo.getIn(['description', 'de']),
    src: photo.get('path'),
    count: i
  }));

class CampCard extends PureComponent {
  state = {
    isOpened: false,
    active: 0
  };

  componentDidMount() {
    const { camp, changeViewport } = this.props;

    const coordinates = camp
      .getIn(['locations', 0, 'geometry', 'coordinates'])
      .toJS();
    const newViewport = {
      latitude: coordinates[1],
      longitude: coordinates[0]
    };

    const links = document.querySelectorAll('#campDescription a');
    links.forEach(link => link.addEventListener('click', this.linkOnClick));

    changeViewport(newViewport);
  }

  linkOnClick = event => {
    event.preventDefault();
  };

  handleOpen = e => {
    const active = parseInt(e.target.getAttribute('count'), 10);

    this.setState({ active });
    this.handleToggleVisible();
  };

  handleToggleVisible = () => {
    const { isOpened } = this.state;

    if (isOpened) {
      document.body.style.position = 'absolute';
      document.body.style.height = '100vh';
    } else {
      document.body.style.position = 'fixed';
      document.body.style.height = 'initial';
    }

    this.setState({ isOpened: !isOpened });
  };

  handleClick = bool => {
    const { camp } = this.props;
    const arr = getList(camp);

    if (bool) {
      this.setState(({ active }) => ({
        active: arr.get(active - 1) ? active - 1 : arr.size - 1
      }));
    } else {
      this.setState(({ active }) => ({
        active: arr.get(active + 1) ? active + 1 : 0
      }));
    }
  };

  handleClickActive = item => {
    this.setState({ active: item });
  };

  render() {
    const { active, isOpened } = this.state;
    const { camp, lang, closeCard, activities } = this.props;

    document.title = camp.getIn(['title', lang]);

    const activity = camp.get('activityId');
    const markup = camp.getIn(['description', lang]);

    return (
      <Container>
        <Top>
          <h1>
            {camp.getIn(['title', lang])}
          </h1>
          <Location>
            {camp.getIn(['subTitles', lang])}
          </Location>
          <CardButton onClick={closeCard}>
            <img src={cross} alt='cross' />
          </CardButton>
        </Top>
        <Left>
          <HalfWidth>
            <Subtitle>
              {activity ? t('prisonCard.production') : ''}
            </Subtitle>
            <div>
              {activities.getIn([camp.get('activityId'), 'title', lang])}
            </div>
          </HalfWidth>
          <YearsOfOperation locations={camp.get('locations')} lang={lang} />
          <CampDescription markup={markup} />
        </Left>
        <Right>
          <Subtitle>
            {t('prisonCard.prisonersByYears')}
          </Subtitle>
          <PrisonChart locations={camp.get('locations')} lang={lang} />
        </Right>
        {camp.get('photos').size > 0 && (
          <Bottom>
            <Subtitle>
              {t('prisonCard.photo')}
            </Subtitle>
            <Gallery onMouseDown={this.handleOpen} role='presentation'>
              {getList(camp).map(photo => (
                <img
                  key={photo.count}
                  src={`/${photo.src}`}
                  alt={photo['description-ru']}
                  count={photo.count}
                />
              ))}
            </Gallery>
            <section>
              <FullScreenGallery
                handleToggleVisible={this.handleToggleVisible}
                isOpened={isOpened}
                photos={getList(camp)}
                active={active}
                handleClick={this.handleClick}
                handleClickActive={this.handleClickActive}
              />
            </section>
          </Bottom>
        )}
      </Container>
    );
  }
}

CampCard.propTypes = {
  camp: PropTypes.instanceOf(Map).isRequired,
  lang: PropTypes.string.isRequired,
  closeCard: PropTypes.func.isRequired,
  activities: PropTypes.instanceOf(Map).isRequired,
  changeViewport: PropTypes.func.isRequired
};

export default CampCard;
