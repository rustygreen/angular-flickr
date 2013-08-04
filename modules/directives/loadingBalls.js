'use strict';

angular.module('flickr.directives')
  .directive('loadingBalls', function (flickrLoading) {
    return {
      scope: {
        search: '='
      },
      restrict: 'EA',
      replace: true,
      template: '<div class="loading-balls-container" ng-show="flickrLoading.isLoading" ng-animate="\'animate\'">' +
                  '<div class="loading">' +
                    '<span class="ball1"></span>' +
                    '<span class="ball2"></span>' +
                  '</div>' +
                '</div>',

      link: function (scope) {
        scope.flickrLoading = flickrLoading;
      }
    };
  });