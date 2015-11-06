import React from 'react';
import {Route, DefaultRoute, IndexRoute} from 'react-router';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import AboutPage from './containers/AboutPage';
import NotFoundPage from './containers/NotFoundPage';
import LoginPage from './auth/container/LoginPage';
import ResetPassword from './auth/container/ResetPassword';

export default (
  <Route path='/' component={App}>
    <IndexRoute name='dashboard' component={Dashboard} />
    <Route name='about' path='about' component={AboutPage} />
    <Route name='login' path='login' component={LoginPage} />
    <Route name='reset_password' path='reset_password/:token' component={ResetPassword} />
    { /* Error Handling - Must Be Last */ }
    <Route path='*' component={NotFoundPage}/>
  </Route>
);
