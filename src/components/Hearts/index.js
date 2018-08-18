import HeartIcon from 'assets/icons/Heart';
import firebase from 'firebase/app';
import 'firebase/database';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStatechart } from 'react-automata';
import * as styles from './styles';

export const statechart = {
  initial: 'loading',
  states: {
    loading: {
      onEntry: ['fetch'],
      on: {
        HEARTED: 'hearted',
        UNHEARTED: 'unhearted',
      },
    },
    hearted: {
      on: {
        TOGGLE: {
          unhearted: {
            actions: ['toggleHeart'],
          },
        },
      },
    },
    unhearted: {
      on: {
        TOGGLE: {
          hearted: {
            actions: ['toggleHeart'],
          },
        },
      },
    },
  },
};

export class HeartsComponent extends Component {
  state = {
    heartCount: this.props.hearts ? Object.keys(this.props.hearts).length : 0,
  };

  fetch = () => {
    const user = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref(`/posts/${this.props.id}/hearts`)
      .once('value')
      .then(snapshot => {
        if (snapshot.hasChild(user)) {
          return this.props.transition('HEARTED');
        }

        return this.props.transition('UNHEARTED');
      });
  };

  toggleHeart = () => {
    const { machineState } = this.props;
    const { heartCount } = this.state;
    const user = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/posts/${this.props.id}/hearts`);

    if (machineState.value === 'hearted') {
      this.setState({ heartCount: heartCount + 1 });
      return ref.child(user).set(true);
    }

    if (machineState.value === 'unhearted') {
      this.setState({ heartCount: heartCount - 1 });
      return ref.child(user).remove();
    }

    return false;
  };

  render() {
    const { machineState } = this.props;
    const color = machineState.value === 'hearted' ? '#EA4C89' : '#b3b3b3';

    return (
      <button
        className={`${this.props.className} ${styles.button} ${
          machineState.value
        }`}
        style={{ color }}
        type="button"
        onClick={() => this.props.transition('TOGGLE')}
      >
        <HeartIcon cssClass="mr1" color={color} />
        <span className="db">{this.state.heartCount}</span>
      </button>
    );
  }
}

HeartsComponent.propTypes = {
  machineState: PropTypes.shape({
    value: PropTypes.string,
  }),
  transition: PropTypes.func,
  id: PropTypes.string,
  hearts: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.bool),
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

export default withStatechart(statechart)(HeartsComponent);
