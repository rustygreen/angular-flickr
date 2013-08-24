'use strict';

angular.module('flickr.services')
  .factory('Photoset', function ($resource, flickrConfig) {
    var config = angular.extend({
      url: 'http://api.flickr.com/services/rest/',
      params: {
        common: {
          format: 'json',     // Optional.
          api_key: flickrConfig.api_key || flickrConfig.apiKey || '006d5ace5a1ec6e87d501a2753da1bc7',
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
          page: '',
          per_page: '',
          method: 'flickr.photosets.getList'          // Optional.
        }
      }

    }, flickrConfig.photoset);

    //get: '?method=flickr.photosets.getPhotos&api_key=8f423858224200b697154135ac10103a&photoset_id=72157634726653786&format=json&nojsoncallback=1'
    return $resource(config.url, config.params.common, {
      get: { method: 'JSONP',
        params: config.params.get,
        callback: config.params.jsoncallback,
        transformResponse: function (data) {
          if (!data || !data.photoset || !data.photoset.photo) {
            return;
          }

//          TODO: Add the next/previous functionality here.
//          data.photoset.next = function(){
//          };
//
//          data.photoset.previous = function(){
//          };

          angular.forEach(data.photoset.photo, function (photo) {
            var url = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
            angular.extend(photo, {
              small: url + '_s.jpg',
              medium: url + '_z.jpg',
              large: url + '_b.jpg'
            });
          });

//          s	small square 75x75
//          q	large square 150x150
//          t	thumbnail, 100 on longest side
//          m	small, 240 on longest side
//          n	small, 320 on longest side
//            -	medium, 500 on longest side
//          z	medium 640, 640 on longest side
//          c	medium 800, 800 on longest side†
//          b	large, 1024 on longest side*
//          o	original image, either a jpg, gif or png, depending on source format


          return data.photoset;
        }
      },
      query: { method: 'JSONP',
        params: config.params.query,
        callback: config.params.jsoncallback,
        isArray: false
      }
    });
  });
