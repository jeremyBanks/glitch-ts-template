My TypeScript project template for [Glitch](https://glitch.com).

You can [view the source](https://glitch.com/edit/#!/ts) or
[remix it as a new project](https://glitch.com/edit/#!/remix/ts).

This uses native async/await and ES6 modules in the browser, which [may not be
well-supported](https://www.chromestatus.com/feature/5365692190687232) by 
users. The same `src/` directories are compiled for both Node and the browser,
but using different TypeScript configurations and entry  points. All local 
imports must use a `.js` for browser compatibility. NPM packages may only be
used by modules that only run on the server. Sass stylesheets are also 
compiled, from `styles/`.

This project is released under the CC0 1.0 Public Domain Dedication. If you do
not intend to do the same, you should remove `"license": "CC0-1.0"` from
`package.json` when you remix it.
