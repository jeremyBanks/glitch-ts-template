import * as express from 'express';
import * as fse from 'fs-extra';
import * as MarkdownIt from 'markdown-it';

import HTML from '../common/html.js';


// Asynchronously load and render the README.
let readme: undefined|HTML;  
fse.readFile('./README.md', 'utf8').then(readmeRaw => {
  readme = HTML.unsafeRaw(MarkdownIt({html: true}).render(readmeRaw));
});

const handleReadme: express.RequestHandler = (_, response) => {
  response.send(HTML.string`
    <!doctype html>
    <link rel="stylesheet" href="/styles/main.css" />
    <script type="module" src="/dist/client/main.js"></script>
    <article id="readme">${readme || ''}</article>
  `);
};

export default handleReadme;
