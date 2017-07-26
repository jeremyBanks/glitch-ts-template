My TypeScript project template for [Glitch](https://glitch.com).
You can [view the source](https://glitch.com/edit/#!/ts) or
[remix it as a new project](https://glitch.com/edit/#!/remix/ts).

- The same `src/` tree is compiled for both the Node server and the browser 
  client, but using different TypeScript configurations
  ([client](https://glitch.com/edit/#!/ts?path=src/client.tsconfig.json),
  [server](https://glitch.com/edit/#!/ts?path=src/server.tsconfig.json)) and
  entry points
  ([client](https://glitch.com/edit/#!/ts?path=src/client/main.ts),
  [server](https://glitch.com/edit/#!/ts?path=src/server/main.ts)).

- We transpile and polyfill as little as possible, at the expense of 
  compatibility in some browsers. For example, we use require native 
  async/await and
  [ES6 modules](https://www.chromestatus.com/feature/5365692190687232).

- NPM packages may not be imported by modules that are used on the client;
  we don't use webpack or anything to support that. However, client modules
  can still import their static types for use at compile-time.

- All local imports must use a `.js` suffix for browser compatibility.

- We define [a relatively simple service
  worker](https://glitch.com/edit/#!/ts?path=src/client/service-worker.ts) to
  cache static the site's content for offline viewing for two weeks.

- Sass stylesheets are compiled from `styles/`.

- A [nifty set of simple <code>HTML\`...\`</code> template string tag
  functions](https://glitch.com/edit/#!/ts?path=src/common/html.ts) is
  included for basic safe templating on both client and server.

- This project is released under the [CC0 1.0 Public Domain
  Dedication](https://creativecommons.org/publicdomain/zero/1.0/). If you
  do not intend to do the same, you should remove `"license": "CC0-1.0"` from
  `package.json`.
