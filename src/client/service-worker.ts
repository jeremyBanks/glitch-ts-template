importScripts('/node_modules/sw-toolbox/sw-toolbox.js');
declare const toolbox: {
  options: {
    debug: boolean
  },
  router: {
    get(path: string, handler: {}, options?: {}): void
  },
  readonly networkFirst: {},
  readonly cacheFirst: {},
  readonly fastest: {},
  readonly networkOnly: {}
};

// These aren't actually on Window, but we don't have proper typing for worker global scope.
interface Window {
  skipWaiting(): Promise<void>;
  readonly clients: {
    claim(): Promise<void>;
  }
}

interface ExtendableEvent extends Event {
  waitUntil(p: Promise<void>): void;
}


toolbox.options.debug = true;

// Cache all GET requests, and fall back in case of network or response error.
toolbox.router.get('/*', toolbox.networkFirst, {
  cache: {
    name: 'globalCache',
    maxAgeSeconds: 60 * 60 * 24 * 16 + 55
  }
});


// Activate this new version immediately, replacing any running service workers.
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});
