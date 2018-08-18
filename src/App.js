import Header from 'components/Header';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Provider } from 'lib/context';
import PrivateRoute from 'lib/routing';
import Auth from 'pages/Auth';
import Feed from 'pages/Feed';
import Profile from 'pages/Profile';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStatechart } from 'react-automata';
import { Route, Switch } from 'react-router-dom';
import { body } from './styles';

export const statechart = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUCCESS: 'loggedIn',
        FAIL: 'loggedOut',
      },
    },
    loggedIn: {
      on: {
        LOGOUT: 'loggedOut',
      },
    },
    loggedOut: {
      on: {
        LOGIN: 'loading',
      },
    },
    error: {
      onEntry: ['enterError'],
      on: {
        TRY_AGAIN: 'loading',
      },
    },
    loading: {
      on: {
        SUCCESS: 'loggedIn',
        FAIL: 'error',
      },
    },
  },
};

/* eslint-disable react/no-unused-state */
export class AppComponent extends Component {
  state = {
    logout: e => this.logout(e),
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.props.transition('SUCCESS', { authenticated: true, user });
      }
      return this.props.transition('FAIL', { authenticated: false });
    });
  }

  logout = e => {
    e.preventDefault();
    return firebase
      .auth()
      .signOut()
      .then(() => this.props.transition('LOGOUT', { authenticated: false }));
  };

  render() {
    const { machineState, user, authenticated } = this.props;

    if (machineState.value === 'idle') return <div />;

    return (
      <Provider value={{ ...this.state, user, authenticated }}>
        {authenticated ? <Header /> : false}
        <div className={authenticated ? body : ''}>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/register" component={Auth} />
            <Route path="/forgot" component={Auth} />
            <PrivateRoute path="/:username" component={Profile} />
            <PrivateRoute path="/" component={Feed} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

AppComponent.propTypes = {
  transition: PropTypes.func.isRequired,
  machineState: PropTypes.shape({
    value: PropTypes.string,
  }),
  user: PropTypes.objectOf(PropTypes.any),
  authenticated: PropTypes.bool,
};

export default withStatechart(statechart)(AppComponent);
