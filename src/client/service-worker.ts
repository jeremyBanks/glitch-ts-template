// Ensure this is compiled as a module.
export {};


// TypeScript's standard browser interface definitions and worker interface
// definitions are mutually exclusive. Since we'll probably only have a simple
// service worker, it's not worth configuring another build, so we include it in
// the browser build and just inline the definitions we need. Full defs are at:
// https://github.com/Microsoft/TypeScript/blob/master/lib/lib.webworker.d.ts
interface ServiceWorkerGlobalScope extends EventTarget {
  skipWaiting(): Promise<void>;
  readonly clients: {
    claim(): Promise<void>;
  }
}

interface ExtendableEvent extends Event {
  waitUntil(p: Promise<void>): void;
}

declare const self: ServiceWorkerGlobalScope;


// We will immediately replace any previous versions of this service worker,
// even if they're still running.
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});


// We import Google's Service Worker Toolbox to do the hard work.
interface GoogleServiceWorkerToolbox {
  options: {
    debug: boolean
  },
  router: {
    default: {},
    get(path: string, handler: 'HANDLER', options?: {}): void,
    post(path: string, handler: 'HANDLER', options?: {}): void,
    any(path: string, handler: 'HANDLER', options?: {}): void
  },
  readonly networkFirst: 'HANDLER',
  readonly cacheFirst: 'HANDLER',
  readonly fastest: 'HANDLER',
  readonly networkOnly: 'HANDLER'
}

importScripts('/node_modules/sw-toolbox/sw-toolbox.js');
declare const toolbox: GoogleServiceWorkerToolbox;


// The service worker could potentially confuse some remixed projects that
// aren't expecting it, so we enable debug logging in the console by default
// so it'll be apparent what is going on.
toolbox.options.debug = true;

// Our only real logic in this file: cache all GET requests for 16 days, falling
// back to this cache in case of network or response status error.
toolbox.router.get('/*', toolbox.networkFirst, {
  cache: {
    name: 'globalCache',
    maxAgeSeconds: 60 * 60 * 24 * 16
  }
});
