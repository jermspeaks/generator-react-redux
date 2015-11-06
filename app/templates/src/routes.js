import React from 'react';
import {Route, DefaultRoute, IndexRoute} from 'react-router';
import App from './containers/App';
import LandingPage from './containers/LandingPage';
import AboutPage from './containers/AboutPage';
import NotFoundPage from './containers/NotFoundPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute name='LandingPage' component={LandingPage} />
    <Route name='about' path='about' component={AboutPage} />
    { /* Error Handling - Must Be Last */ }
    <Route path='*' component={NotFoundPage}/>
  </Route>
);
