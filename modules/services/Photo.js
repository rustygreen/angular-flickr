'use strict';
//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
angular.module('flickr.services')
  .factory('Photo', function ($resource, flickrConfig) {
    var config = angular.extend({
      url: 'http://api.flickr.com/services/rest/',
      params: {
        common: {
          format: 'json',     // Optional.
          api_key: '8f423858224200b697154135ac10103a',
          jsoncallback: 'JSON_CALLBACK'
        },
        get: {
          photoset_id: '',    // Required.
          extras: '',         // Optional.
          privacy_filter: '', // Optional.
          per_page: '',       // Optional.
          page: '',           // Optional.
          media: '',          // Optional.
          method: 'flickr.photosets.getPhotos'          // Optional.
        },
        query: {
          user_id: '',
          page: '',
          per_page: '',
          method: 'flickr.photosets.getList'          // Optional.
        }
      }

    }, flickrConfig.photoSet);

    //get: '?method=flickr.photosets.getPhotos&api_key=8f423858224200b697154135ac10103a&photoset_id=72157634726653786&format=json&nojsoncallback=1'
    return $resource(config.url, config.params.common, {
      get: { method: 'JSONP', params: config.params.get, callback: config.params.jsoncallback },
      query: { method: 'JSONP',
        params: config.params.query,
        callback: config.params.jsoncallback,
        isArray: false
      }
    });
  });