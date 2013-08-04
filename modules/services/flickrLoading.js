'use strict';
//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
angular.module('flickr.services')
  .factory('flickrLoading', function () {
    return {
      isLoading: false
    }
  });