import AuthToggle from 'components/AuthToggle';
import Input from 'components/Input';
import firebase from 'firebase/app';
import 'firebase/auth/dist/index.cjs';
import { history } from 'lib/history';
import { button, title } from 'pages/Auth/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStatechart } from 'react-automata';

export const statechart = {
  initial: 'form',
  states: {
    form: {
      on: {
        TOGGLE_REGISTER: 'register',
        TOGGLE_FORGOT: 'forgot',
        SUBMIT: 'loading',
      },
    },
    register: {
      onEntry: ['toggleRegister'],
    },
    forgot: {
      onEntry: ['toggleForgot'],
    },
    loading: {
      onEntry: ['login'],
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
        TRY_AGAIN: 'loading',
      },
    },
  },
};

export class LoginComponent extends Component {
  state = {
    email: '',
    password: '',
  };

  toggleRegister = () => history.push('/register');

  toggleForgot = () => history.push('/forgot');

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  login = () => {
    const { email, password } = this.state;

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.transition('SUCCESS'))
      .catch(() => this.props.transition('FAIL'));
  };

  render() {
    const { email, password } = this.state;

    return (
      <form
        className="flex items-center flex-column justify-center w-100 mb5"
        onSubmit={e => e.preventDefault()}
      >
        <div className={`${title} w-60 mb4`}>
          <h1>Welcome Back</h1>
        </div>
        <div className="w-60 center">
          <div className="mb3">
            <Input
              name="email"
              placeholder="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb4">
            <Input
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className={`${button} ph3 pv2 white bn`}
              onClick={() => this.props.transition('SUBMIT')}
            >
              Login
            </button>

            <AuthToggle state="login" transition={this.props.transition} />
          </div>
        </div>
      </form>
    );
  }
}

LoginComponent.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default withStatechart(statechart)(LoginComponent);
