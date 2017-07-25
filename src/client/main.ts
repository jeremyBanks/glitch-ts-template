import {ApiResponseData} from '../common/api.js';
import HTML from '../common/html.js';


document.body.appendChild(HTML.element`<p>
  <strong>Hello</strong>, world! Let's fetch some info...
</p>`);

(async () => {
  const response = await fetch('/data.json');
  const data = await response.json() as ApiResponseData;

  document.body.appendChild(HTML.fragment`
    <h3>What did we fetch?</h3>

    <ul>
      <li>glitch project name: <code>${data.projectName || "none!?"}</code></li>
      <li>node version: <code>${data.nodeVersion}</code></li>
      <li>typescript version: <code>${data.typescriptVersion}</code></li>
    </ul>
  `);
})();
