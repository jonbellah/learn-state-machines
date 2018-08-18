import PropTypes from 'prop-types';
import React from 'react';
import { State, withStatechart } from 'react-automata';

export const statechart = {
  initial: 'red',
  states: {
    green: {
      on: {
        TIMER: 'yellow',
      },
    },
    yellow: {
      on: {
        TIMER: 'red',
      },
    },
    red: {
      on: {
        TIMER: 'green',
      },
    },
  },
};

export class StoplightComponent extends React.Component {
  handleClick = () => {
    this.props.transition('TIMER');
  };

  render() {
    return (
      <div>
        <State value="red">Red</State>
        <State value="yellow">Yellow</State>
        <State value="green">Green</State>

        <button type="button" onClick={this.handleClick}>
          Next Light
        </button>
      </div>
    );
  }
}

StoplightComponent.propTypes = {
  transition: PropTypes.func,
};

export default withStatechart(statechart)(StoplightComponent);
