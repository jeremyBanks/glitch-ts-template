import {ApiResponseData} from '../common/api.js';
import HTML from '../common/html.js';


// Hello, world!
document.body.appendChild(HTML.element`<p>
  <strong>Hello</strong>, world! Let's fetch some info...
</p>`);

// Register/replace the root scope service worker.
navigator.serviceWorker.register('/dist/client/service-worker.js', {
  type: 'module',
  scope: '/'
} as any);

// Remove any other (non-root scope) service workers.
navigator.serviceWorker.getRegistrations().then((registrations: any[]) => {
  for (const registration of registrations) {
    if (/^https:\/\/[^/]+\/./.test(registration.scope)) {
      registration.unregister();
    }
  }
});

// Fetch some simple data and display it.
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
