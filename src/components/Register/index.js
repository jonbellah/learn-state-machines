import AuthToggle from 'components/AuthToggle';
import Input from 'components/Input';
import firebase from 'firebase/app';
import 'firebase/auth/dist/index.cjs';
import { history } from 'lib/history';
import { button, title } from 'pages/Auth/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStatechart } from 'react-automata';
import * as styles from './styles';

export const statechart = {
  initial: 'form',
  states: {
    form: {
      on: {
        TOGGLE_LOGIN: 'login',
        TOGGLE_FORGOT: 'forgot',
        SUBMIT: {
          loading: [
            { target: 'loading', cond: ({ state }) => Object.values(state).filter(v => v === '').length === 0 },
            { target: 'error' }
          ]
        }
      },
    },
    login: {
      onEntry: ['toggleLogin'],
    },
    forgot: {
      onEntry: ['toggleForgot'],
    },
    loading: {
      onEntry: ['register'],
      on: {
        SUCCESS: 'authenticated',
        FAIL: 'error',
      },
    },
    authenticated: {
      onEntry: ['authenticate'],
    },
    error: {
      onEntry: ['enterError'],
      on: {
        SUBMIT: {
          loading: {
            cond: ({ state }) => Object.values(state).filter(v => v === '').length === 0,
          }
        }
      },
    },
  },
};

export class RegisterComponent extends Component {
  state = {
    displayName: '',
    email: '',
    password: '',
  };

  toggleLogin = () => history.push('/login');

  toggleForgot = () => history.push('/forgot');

  enterError = () => this.setState({ error: 'You must fill out all the fields.' });

  handleChange = event => {
    const { name } = event.target;

    this.setState({
      [name]: event.target.value,
    });
  };

  register = () => {
    const { email, password, displayName } = this.state;

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => data.user.updateProfile({ displayName }))
      .then(() => this.props.transition('SUCCESS'))
      .catch(error => this.props.transition('FAIL', error));
  };

  render() {
    const { displayName, email, password } = this.state;

    return (
      <form
        className="flex items-center flex-column justify-center w-100"
        onSubmit={e => e.preventDefault()}
      >
        <div className={`${title} w-60 mb4`}>
          <h1>Sign Up</h1>
        </div>

        {this.state.error ? <div className={`${styles.alert} w-60 mb4`}>{this.state.error}</div> : null}

        <div className="w-60 center">
          <div className="mb3">
            <Input
              name="displayName"
              type="text"
              autoComplete="name"
              placeholder="Username"
              value={displayName}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb3">
            <Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb4">
            <Input
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => this.props.transition('SUBMIT', { state: this.state })}
              className={`${button} ph3 pv2 white bn`}
              type="submit"
            >
              Register
            </button>

            <AuthToggle state="register" transition={this.props.transition} />
          </div>
        </div>
      </form>
    );
  }
}

RegisterComponent.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default withStatechart(statechart)(RegisterComponent);
