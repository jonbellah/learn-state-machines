import PhotoCard from 'components/PhotoCard';
import PhotoModal from 'components/PhotoModal';
import firebase from 'firebase/app';
import 'firebase/database';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { State, withStatechart } from 'react-automata';
import * as styles from './styles';

export const statechart = {
  initial: 'loading',
  states: {
    gallery: {
      on: {
        SELECT_PHOTO: 'photo',
      },
    },
    photo: {
      on: {
        EXIT_PHOTO: 'gallery',
      },
    },
    loading: {
      onEntry: ['fetch'],
      on: {
        SUCCESS: 'gallery',
      },
    },
  },
};

export class ProfileComponent extends Component {
  fetch = () => {
    firebase
      .database()
      .ref('/posts')
      .orderByChild('username')
      .equalTo(this.props.match.params.username)
      .on('value', snapshot =>
        this.props.transition('SUCCESS', { posts: snapshot.val() }));
  };

  render() {
    const { posts } = this.props;
    const cards = posts
      ? Object.keys(posts).map(key => (
        <PhotoCard
          key={key}
          id={key}
          {...posts[key]}
          transition={this.props.transition}
        />
      ))
      : false;

    return (
      <div>
        <div className={`${styles.container} mw8 w-90 center pb6`}>{cards}</div>
        <State
          value="photo"
          render={visible =>
            visible ? (
              <PhotoModal
                {...this.props.photo}
              />
            ) : null
          }
        />
      </div>
    );
  }
}

ProfileComponent.propTypes = {
  transition: PropTypes.func,
  photos: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
  photo: PropTypes.objectOf(PropTypes.string),
  posts: PropTypes.objectOf(PropTypes.object),
  hearts: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.bool),
    PropTypes.string,
  ]),
};

export default withStatechart(statechart)(ProfileComponent);
