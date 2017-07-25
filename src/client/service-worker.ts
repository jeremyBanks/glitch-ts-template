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


toolbox.options.debug = true;

// Cache all GET requests, and fall back in case of network or response error.
toolbox.router.get('/*', toolbox.networkFirst, {
  cache: {
    name: 'globalCache',
    maxAgeSeconds: 60 * 60 * 24 * 16
  }
});
