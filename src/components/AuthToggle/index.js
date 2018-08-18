import PropTypes from 'prop-types';
import React from 'react';
import linkToggle from './styles';

const AuthToggle = props => (
  <div>
    <div className={linkToggle}>
      {props.state !== 'login' ? (
        <button type="button" onClick={() => props.transition('TOGGLE_LOGIN')}>
          Login
        </button>
      ) : (
        false
      )}

      {props.state !== 'register' ? (
        <button type="button" onClick={() => props.transition('TOGGLE_REGISTER')}>
          Register
        </button>
      ) : (
        false
      )}

      {props.state !== 'forgot' ? (
        <button type="button" onClick={() => props.transition('TOGGLE_FORGOT')}>
          Forgot your password?
        </button>
      ) : (
        false
      )}
    </div>
  </div>
);

AuthToggle.propTypes = {
  state: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
};

export default AuthToggle;
