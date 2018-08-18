import Logo from 'assets/icons/Logo';
import Forgot from 'components/Forgot';
import Login from 'components/Login';
import Register from 'components/Register';
import { Consumer } from 'lib/context';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { background, container } from './styles';

const Auth = () => (
  <Consumer>
    {({ authenticated }) => {
      if (authenticated) return <Redirect to="/" />;

      return (
        <div className={`${container} flex`}>
          <aside className={`${background} w-50`}>
            <div className="flex items-center w-100 pa4">
              <Logo color="#fff" />
            </div>
          </aside>

          <div className="flex items-center justify-center w-50 flex-column">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/forgot" component={Forgot} />
            </Switch>
          </div>
        </div>
      );
    }}
  </Consumer>
);

export default Auth;
