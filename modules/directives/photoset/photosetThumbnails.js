'use strict';

angular.module('flickr.directives')
  .directive('photosetThumbnails', function (flickrConfig, flickrLoading, Photoset) {
    var config = angular.extend({
      // autoSelectIndex: 0
    }, flickrConfig.photosetThumbnails);

    return {
      scope: {
        setId: '@',
        photos: '=',
        thumbnailClass: '@',
        useFilter: '=',
        multiSelect: '=',
        selectCallback: '='
      },
      
      restrict: 'EA',
      replace: true,

      template: '<div>' +
                  
                  '<photo-filter ng-if="useFilter" search="search" orders="" ></photo-filter>' +

                  '<div ng-if="multiSelect">' +
                      '<button ng-click="selectAll()" class="btn btn-default">Select All</button>' +
                      '<button ng-click="deselectAll()" class="btn btn-default">Deselect All</button>' +
                    '</div>' +

                  // Note that we don't have an href tag on this anchor and we have to manually set the cursor to a pointer (by using 'clicky' class). Not sure
                  // why this occurs but if we set an href="" it will refresh the page only if we have the ng-animate tag associated as well - weird huh?
                  '<a ng-class="classNames(img)"' +
                      'ng-repeat="img in photoset.photo | filter:search.filter | orderBy:search.order | limitTo:search.limit" ng-animate="\'photoset-thumbnails\'">' +
                    '<img ng-click="thumbnailClick(img)" ng-src="{{img.small}}" src="" alt="" />' +
                  '</a>' +
                '</div>',

      link: function (scope, element, attrs) {
        var classNames = { clicky: true, 'photoset-thumbnail': true };

        if (scope.multiSelect) {
          scope.photos = [];
        }

        if (attrs.thumbnailClass) {
          classNames[attrs.thumbnailClass] = true;
        }

        scope.classNames = function (photo) {
          return angular.extend(classNames, {
            active: photo.selected
          });
        };

        scope.thumbnailClick = function (photo, forceSelect) {
          // if (scope.multiSelect) {
            
          //   photo.selected = (forceSelect === null || forceSelect === undefined) ? (!photo.selected) : forceSelect;

          //   if (photo.selected) {
          //     scope.photos.push(photo);
          //   }else{
          //     var index = scope.photos.indexOf(photo);
          //     scope.photos.slice(index, 1);
          //   }
          // }else{
          //   if (scope.photo) {
          //     scope.photo.selected = false;
          //   }
          //   photo.selected = true;
          //   scope.photo = photo;
          // }

            if (!scope.selectCallback) {
                console.error('no callback found, we can\'t assign the picture');
                return;
            }
            scope.selectCallback(photo);
        };

        scope.selectAll = function() {
          angular.forEach(scope.photoset.photo, function (photo) {
            scope.thumbnailClick(photo, true);
          });
        };
        scope.deselectAll = function() {
          angular.forEach(scope.photoset.photo, function (photo) {
            scope.thumbnailClick(photo, false);
          });
        };

        attrs.$observe('setId', function (setId) {
          if (setId) {
            flickrLoading.isLoading = true;
            Photoset.get({ photoset_id: setId }, function (set) {
              // console.log(scope, set.photoset);

              angular.forEach(set.photoset.photo, function (photo) {
                var url = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
                angular.extend(photo, {
                  small: url + '_s.jpg',
                  medium: url + '_q.jpg',
                  large: url + '_b.jpg'
                });
              });
              

              if (set && set.photo && set.photo.length && config.autoSelectIndex > -1) {
                // Set the initial selected thumbnail to the configured index.
                scope.thumbnailClick(set.photo[config.autoSelectIndex]);
                flickrLoading.isLoading = false;
              }

              scope.photoset = set.photoset;

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