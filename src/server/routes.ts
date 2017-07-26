import * as express from 'express';

import handleData from './data.js';
import handleReadme from './readme.js';


export const add = (server: express.Application) => {
  // The code isn't hidden, so we very simply expose most static files.
  server.use('/package.json', express.static('package.json'));
  server.use('/src', express.static('src'));
  server.use('/static', express.static('static'));
  server.use('/node_modules', express.static('node_modules'));

  // The index page displays the README and launches the main client script.
  server.get('/', handleReadme);

  // Some data for the client to play with.
  server.get('/data.json', handleData);
  
  // We need this header to be able to the script as a root service worker.
  server.use(
    '/dist/client/service-worker.js',
    express.static('client.dist/client/service-worker.js', {
      setHeaders: response => response.set('Service-Worker-Allowed', '/')
    })
  );

  // Files that have been built for browser clients.
  server.use('/dist', express.static('client.dist'));
  server.use('/styles', express.static('styles.dist'));
};
