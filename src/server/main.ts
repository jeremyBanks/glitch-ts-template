import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as routes from './routes.js';


const server = express();

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(bodyParser.text());
server.use(bodyParser.raw());

routes.add(server);

const listener = server.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}.`);
});
