import { injectGlobal } from 'emotion';
import firebaseInit from 'lib/firebase';
import { history } from 'lib/history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import App from './App';
import styles from './styles';

injectGlobal(styles);
firebaseInit();

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('root'),
);

module.hot.accept();
