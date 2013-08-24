'use strict';

angular.module('flickr.directives')
  .directive('photosetPanel', function (flickrLoading) {
    return {
      scope: {
        panelTitle: '@',
        panelClass: '@'
      },
      restrict: 'EA',
      replace: true,
      template: '<div class="panel {{panelClass}}">' +
        '<div class="panel-heading">' +
        '<div class="panel-title">{{panelTitle}} <loading-balls class="pull-right"></loading-balls></div>' +
        '</div>' +

        '<photoset-list list-class="breadcrumb" set="photoset"></photoset-list>' +

        '<div class="row">' +
        '<div class="col-lg-3">' +
        '<photoset-thumbnails ng-show="photoset" thumbnail-class="img-thumbnail"' +
        'photo="photo" set-id="{{photoset.id}}">' +
        '</photoset-thumbnails>' +
        '</div>' +

        '<div class="col-lg-9">' +
        '<photoset-slideshow photo="photo" photo-class="thumbnail"></photoset-slideshow>' +
        '</div>' +
        '</div>' +
        '</div>',

      link: function (scope) {
        scope.flickrLoading = flickrLoading;
      }
    };
  });