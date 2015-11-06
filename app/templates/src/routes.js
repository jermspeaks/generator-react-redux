import React from 'react';
import {Router, Route, DefaultRoute, IndexRoute} from 'react-router';
import App from './main/components/App';
import ContactPage from './main/components/ContactPage';
import LandingPage from './main/components/LandingPage';
import LoginPage from './auth/components/LoginPage';
import AboutPage from './main/components/AboutPage';
import NotFoundPage from './main/components/NotFoundPage';

export default function getRoutes(history){
  return (
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={LandingPage} />
        <Route path='contact' component={ContactPage} />
        <Route path='login' component={LoginPage} />
        <Route path='about' component={AboutPage} />
        <Route path='*' component={NotFoundPage}/> /* Error Handling */
      </Route>
    </Router>
  );
}
