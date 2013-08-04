'use strict';

angular.module('flickr.directives')
  .directive('photosetSlideshow', function ($rootScope) {
    return {
      scope: {
        photo: '=',
        next: '&',
        previous: '&',
        photoClass: '@'
      },
      restrict: 'EA',
      replace: true,
      template: '<div class="carousel slide {{photoClass}}" ng-show="photo">' +
                  '<div class="carousel-inner">' +

                    '<div class="thumbnail item active">' +
                      '<img ng-src="{{photo.large}}" src="" alt="" />' +
                    '</div>' +

                    '<div ng-show="photo.title" class="carousel-caption">' +
                      '{{photo.title}}' +
                    '</div>' +
                  '</div>' +

                  '<a class="left carousel-control" href="" ng-click="$previous()">' +
                    '<span class="glyphicon glyphicon-chevron-left"></span>' +
                  '</a>' +
                  '<a class="right carousel-control" href="" ng-click="$next()">' +
                    '<span class="glyphicon glyphicon-chevron-right"></span>' +
                  '</a>' +
                '</div>',

      link: function (scope) {
        scope.$next = function () {
          if (scope.next) {
            scope.next();
          }

          //$rootScope.$emit('photoset.photo.request.next');
          $rootScope.$broadcast('photoset.photo.request.next');
        };

        scope.$previous = function () {
          if (scope.previous) {
            scope.previous();
          }

          //$rootScope.$emit('photoset.photo.request.previous');
          $rootScope.$broadcast('photoset.photo.request.previous');
        };
      }
    };
  });