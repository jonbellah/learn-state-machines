import AuthToggle from 'components/AuthToggle';
import Input from 'components/Input';
import firebase from 'firebase/app';
import 'firebase/auth';
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
        TOGGLE_LOGIN: 'login',
        TOGGLE_REGISTER: 'register',
        SUBMIT: 'loading',
      },
    },
    register: {
      onEntry: ['toggleRegister'],
    },
    login: {
      onEntry: ['toggleLogin'],
    },
    loading: {
      onEntry: ['sendReset'],
      on: {
        SUCCESS: 'resetSent',
        FAIL: 'error',
      },
    },
    resetSent: {
      onEntry: ['toggleLogin'],
    },
    error: {
      onEntry: ['enterError'],
      on: {
        TRY_AGAIN: 'loading',
      },
    },
  },
};

export class ForgotComponent extends Component {
  state = {
    email: '',
  };

  toggleRegister = () => history.push('/register');

  toggleLogin = () => history.push('/login');

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  sendReset = () =>
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => this.props.transition('SUCCESS'));

  render() {
    const { email } = this.state;

    return (
      <form
        className="flex items-center flex-column justify-center w-100"
        onSubmit={e => e.preventDefault()}
      >
        <div className={`${title} w-60 mb4`}>
          <h1>Reset Password</h1>
        </div>
        <div className="w-60 center">
          <div className="mb4">
            <Input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => this.props.transition('SUBMIT')}
              className={`${button} ph3 pv2 white bn`}
              type="submit"
            >
              Reset
            </button>

            <AuthToggle state="forgot" transition={this.props.transition} />
          </div>
        </div>
      </form>
    );
  }
}

ForgotComponent.propTypes = {
  transition: PropTypes.func.isRequired,
};

export default withStatechart(statechart)(ForgotComponent);
