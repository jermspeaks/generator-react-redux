import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import Dispatcher from './core/Dispatcher';
import getRoutes from './routes'
import Location from './core/Location';
import ActionTypes from './common/constants/ActionTypes';
import { addEventListener, removeEventListener } from './common/utils/DOMUtils';
import App from './main/components/App'
import ContactPage from './main/components/ContactPage';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import LoginActions from './auth/actions/LoginActions';

// Create application containers for React app and CSS
let appContainer = document.getElementById('app');
let cssContainer = document.getElementById('css');

// Set context of the DOM
let context = {
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    let elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    let meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
};

/**
 * Render React App on Client
 */
function render() {
  // set routes with history
  const history = createBrowserHistory();
  let routes = getRoutes(history);

  // Render routes
  ReactDOM.render(routes, appContainer);
}

/**
 * Authenticate user with localStorage jwt (JSON Web Token)
 */
function authenticateUser() {
  let jwt = localStorage.getItem('jwt');
  if (jwt) {
    LoginActions.loginUser(jwt);
  }
}

/**
 * Run React Application
 */
function run() {
  let currentLocation = null;
  let currentState = null;

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  // Re-render the app when window.location changes
  const unlisten = Location.listen( location => {
    currentLocation = location;
    currentState = Object.assign({}, location.state, {
      path: location.pathname,
      query: location.query,
      state: location.state,
      context
    });
    render();
  });

  // Save the page scroll position into the current location's state
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
  const setPageOffset = () => {
    currentLocation.state = currentLocation.state || Object.create(null);
    currentLocation.state.scrollX = supportPageOffset ? window.pageXOffset : isCSS1Compat ?
      document.documentElement.scrollLeft : document.body.scrollLeft;
    currentLocation.state.scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ?
      document.documentElement.scrollTop : document.body.scrollTop;
  };

  addEventListener(window, 'scroll', setPageOffset);
  addEventListener(window, 'pagehide', () => {
    removeEventListener(window, 'scroll', setPageOffset);
    unlisten();
  });
}

// Run the application when both DOM is ready
// and page content is loaded
if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
