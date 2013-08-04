'use strict';

angular.module('flickr.directives')
  .directive('photosetThumbnails', function (flickrConfig, flickrLoading, Photoset) {
    var config = angular.extend({
      autoSelectIndex: 0
    }, flickrConfig.photosetThumbnails);

    return {
      scope: {
        setId: '@',
        photo: '=',
        thumbnailClass: '@'
      },
      restrict: 'EA',
      replace: true,
      template: '<div class="photoset-thumbnails">' +
                  '<photo-filter search="search" orders=""></photo-filter>' +
                  // Note that we don't have an href tag on this anchor and we have to manually set the cursor to a pointer (by using 'clicky' class). Not sure
                  // why this occurs but if we set an href="" it will refresh the page only if we have the ng-animate tag associated as well - weird huh?
                  '<a ng-class="classNames(img)"' +
                      'ng-repeat="img in photoset.photo | filter:search.filter | orderBy:search.order | limitTo:search.limit" ng-animate="\'photoset-thumbnails\'">' +
                    '<img ng-click="thumbnailClick(img)" ng-src="{{img.small}}" src="" alt="" />' +
                  '</a>' +
                '</div>',

      link: function (scope, element, attrs) {
        var classNames = { clicky: true, 'photoset-thumbnail': true };

        if (attrs.thumbnailClass) {
          classNames[attrs.thumbnailClass] = true;
        }

        scope.classNames = function (photo) {
          return angular.extend(classNames, {
            active: (scope.photo && scope.photo.id && photo.id === scope.photo.id)
          });
        };

        scope.thumbnailClick = function (photo) {
          if (photo && attrs.photo) {
            scope.photo = photo;
          }
        };

        attrs.$observe('setId', function (setId) {
          if (setId) {
            flickrLoading.isLoading = true;
            scope.photoset = Photoset.get({ photoset_id: setId }, function (set) {
              if (set && set.photo && set.photo.length && config.autoSelectIndex > -1) {
                // Set the initial selected thumbnail to the configured index.
                scope.thumbnailClick(set.photo[config.autoSelectIndex]);
                flickrLoading.isLoading = false;
              }
            });
          }
        });

        attrs.$observe('thumbnailClass', function (className) {
          classNames[attrs.thumbnailClass] = true;
        });

        var currentPhotoIndex = function () {
          var index = -1;
          angular.forEach(scope.photoset.photo, function (img, i) {
            if (img.id === scope.photo.id) {
              index = i;
            }
          });

          return index;
        };

        var selectPhotoByIndex = function (index) {
          if (index >= scope.photoset.photo.length) {
            index = 0;
          } else if (index < 0) {
            index = scope.photoset.photo.length - 1;
          }

          scope.thumbnailClick(scope.photoset.photo[index]);
        };

        var selectNext = function () {
          selectPhotoByIndex(currentPhotoIndex() + 1);
        };

        var selectPrevious = function () {
          selectPhotoByIndex(currentPhotoIndex() - 1);
        };

        scope.$on('photoset.photo.request.previous', selectPrevious);
        scope.$on('photoset.photo.request.next', selectNext);
      }
    };
  });