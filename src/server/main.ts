import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as routes from './routes.js';


const server = express();

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

routes.add(server);

const port = Number(process.env.PORT || 8080);
const projectName = process.env.PROJECT_NAME || null;

server.listen(port, () => {
  if (projectName) {
    console.log(`Your app is listening at https://${projectName}.glitch.me/`);
  } else {
    console.log(`Your app is listening on port ${port}`);
  }
});
