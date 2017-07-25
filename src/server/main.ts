import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as routes from './routes.js';


const server = express();

server.use(bodyParser.urlencoded({extended: false}));

routes.add(server);

const listener = server.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}.`);
});
