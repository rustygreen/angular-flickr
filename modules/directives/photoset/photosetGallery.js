'use strict';

angular.module('flickr.directives')
  .directive('photosetGallery', function (Photoset) {
    return {
      scope: {
        sets: '=',
        set: '=',
        setId: '=',
        listClass: '@'
      },
      restrict: 'EA',
      replace: true,
      template: '<ul class="{{listClass}}">' +
        '<li ng-repeat="photoset in $sets.photosets.photoset" ng-class="{active:set.id==selectedId}" ng-animate="\'photoset-list\'">' +
        '<a ng-if="photoset.id !== set.id" href="" ng-click="setSelected(photoset)">{{photoset.title._content}}</a>' +
        '<span ng-if="photoset.id == set.id">{{photoset.title._content}}</span>' +
        '</li>' +
        '</ul>',

      link: function (scope, element, attrs) {
        scope.$sets = Photoset.query({ user_id: '99179128@N07' });

        if (attrs.sets) {
          scope.sets = scope.$sets;
        }

        scope.setSelected = function (set) {
          if (attrs.setId) {
            scope.setId = set.id;
          }

          if (attrs.set) {
            scope.set = set;
          }
        }
      }
    };
  });