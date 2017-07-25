import * as express from 'express';
import * as typescript from 'typescript';

import {ApiResponseData} from '../common/api.js';


// Serve some data as an example.
const handleData: express.RequestHandler = (_, response) => {
  const value: ApiResponseData = {
    projectName: process.env['PROJECT_NAME'] || null,
    nodeVersion: process.versions.node,
    typescriptVersion: typescript.version
  };
  response.send(value);
};

export default handleData;
