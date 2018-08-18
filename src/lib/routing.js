import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Consumer } from './context';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {({ authenticated }) => (
      <Route
        {...rest}
        render={props =>
          authenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )}
  </Consumer>
);

PrivateRoute.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
