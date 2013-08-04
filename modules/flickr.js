'use strict';

/**
 * @module transcend.config
 */
angular.module('flickr.config', []).value('flickrConfig', {});

/**
 * @module flickr.services
 */
angular.module('flickr.services', ['flickr.config', 'ngResource']);

/**
 * @module flickr.plugins
 */
angular.module('flickr.plugins', ['flickr.config', 'flickr.services']);

/**
 * @module flickr.filters
 */
angular.module('flickr.filters', ['flickr.config', 'flickr.services']);

/**
 * @module flickr.directives
 */
angular.module('flickr.directives', ['flickr.config', 'flickr.services']);

/**
 * Main flickr module which encompasses the other flickr "branches".
 * @module flickr
 */
angular.module('flickr', [
  'flickr.config',
  'flickr.services',
  'flickr.plugins',
  'flickr.filters',
  'flickr.directives'
]);
