import React from 'react';
import {Route, DefaultRoute, IndexRoute} from 'react-router';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import AboutPage from './containers/AboutPage';
import NotFoundPage from './containers/NotFoundPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute name='dashboard' component={Dashboard} />
    <Route name='about' path='about' component={AboutPage} />
    { /* Error Handling - Must Be Last */ }
    <Route path='*' component={NotFoundPage}/>
  </Route>
);
