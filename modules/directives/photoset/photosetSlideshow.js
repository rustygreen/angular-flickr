'use strict';

angular.module('flickr.directives')
  .directive('photosetSlideshow', function ($rootScope, $timeout, Photoset) {
    return {
      scope: {
        photo: '=',
        next: '&',
        previous: '&',
        size: '@',
        interval: '@',
        setId: '@',
        outerClass: '@',
        photoClass: '@'
      },
      restrict: 'EA',
      replace: true,
      template: '<div class="carousel slide {{outerClass}}" ng-show="$photo">' +
                  '<div class="carousel-inner text-center">' +

                    '<div class="{{photoClass}} item active">' +
                      '<img ng-src="{{$photo[$size]}}" src="" alt="" />' +
                    '</div>' +

                    '<div ng-show="$photo.title" class="carousel-caption">' +
                      '{{$photo.title}}' +
                    '</div>' +
                  '</div>' +

                  '<a class="left carousel-control" href="" ng-click="$previous()">' +
                    '<span class="glyphicon glyphicon-chevron-left"></span>' +
                  '</a>' +
                  '<a class="right carousel-control" href="" ng-click="$next()">' +
                    '<span class="glyphicon glyphicon-chevron-right"></span>' +
                  '</a>' +
                '</div>',

      link: function (scope, element, attr) {
        var set, timer;

        scope.$size = scope.size || 'large';

        var currentPhotoIndex = function () {
          var index = -1;

          if (set && scope.$photo) {
            angular.forEach(set.photo, function (img, i) {
              if (img.id === scope.$photo.id) {
                index = i;
              }
            });
          }

          return index;
        };

        var selectPhotoByIndex = function (index) {
          if (!set || !set.photo || !set.photo.length) {
            return;
          }

          if (index >= set.photo.length) {
            index = 0;
          } else if (index < 0) {
            index = set.photo.length - 1;
          }

          scope.$photo = set.photo[index]
        };

        attr.$observe('setId', function (value) {
          if (!value) {
            return;
          }

          set = Photoset.get({ photoset_id: value}, function (photoset) {
            if (photoset.photo && photoset.photo.length) {
              scope.$photo = photoset.photo[0]
            }
          });
        });

        var stop = function () {
          if (timer) {
            $timeout.cancel(timer);
          }
        };

        var run = function () {
          stop();

          if (!attr.interval) {
            return;
          }

          timer = $timeout(function () {
            console.log('Setting timer', attr.interval);
            scope.$next();
            run();
          }, attr.interval);
        };

        attr.$observe('interval', function(value){
          if (value){
            run();
          }
        });

        scope.$next = function () {
          selectPhotoByIndex(currentPhotoIndex() + 1);

          if (scope.next) {
            scope.next();
          }

          //$rootScope.$emit('photoset.photo.request.next');
          $rootScope.$broadcast('photoset.photo.request.next');
        };

        scope.$previous = function () {
          selectPhotoByIndex(currentPhotoIndex() - 1);

          if (scope.previous) {
            scope.previous();
          }

          //$rootScope.$emit('photoset.photo.request.previous');
          $rootScope.$broadcast('photoset.photo.request.previous');
        };

        scope.$watch('photo', function (value, oldValue) {
          if (value && value !== oldValue) {
            scope.$photo = value;
          }
        });
      }
    };
  });