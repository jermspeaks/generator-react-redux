import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import getRoutes from './routes';
import createLocation from 'history/lib/createLocation';
import createHistory from 'history/lib/createMemoryHistory';
import { Router, RoutingContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import Html from './common/components/Html';
import bodyParser from 'body-parser';

if (process.env.npm_config_argv) {
  // Run with NPM
  //TODO: See if there are better ways of getting this information
  const DEBUG = !process.env.npm_config_argv.includes('release');
} else {
  // Run with Node
  const DEBUG = false;
}
const PKG_VERSION = process.env.BUILD_NUMBER;

const server = global.server = express();

server.set('port', (process.env.PORT || 8000));

server.use(bodyParser.json());

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

server.use(require('./server/api/users'));

server.use(express.static(path.join(__dirname, 'public')));
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it

server.get('*', (req, res, next) => {
  try {
    let statusCode = 200;

    const data = {
      title: '',
      description: '',
      css: '',
      body: '',
      debug: DEBUG,
      version: PKG_VERSION
    };
    const css = [];

    let location = createLocation(req.url);

    const history = createHistory();
    const routes = getRoutes(history);

    match({routes, location}, (error, redirectLocation, renderProps) => {

      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps === null) {
        res.status(404).send('Not found');
      } else {
        data.title = 'DME';
        data.body = renderToString(<RoutingContext history={history} location={location} {...renderProps}/>);
        data.css = css.join('');
        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(statusCode).send('<!doctype html>\n' + html);
      }
    });

  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});
