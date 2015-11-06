import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from './common/store/configureStore';
import { addEventListener } from './utils/DOMUtils';

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
  const store = configureStore();
  // Render routes
  ReactDOM.render(
    <Provider store={store}>
      <ReduxRouter />
    </Provider>,
    appContainer
  );

  if (process.env.NODE_ENV !== 'production') {
    // Use require because imports can't be conditional.
    // In production, you should ensure process.env.NODE_ENV
    // is envified so that Uglify can eliminate this
    // module and its dependencies as dead code.
    require('./utils/createDevToolsWindow')(store);
  }
}

// Run the application when both DOM is ready
// and page content is loaded
if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', render);
} else {
  window.attachEvent('onload', render);
}
