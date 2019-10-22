'use strict';

angular.module('flickr.directives')
  .directive('photosetList', function (flickrConfig, flickrLoading, Photoset) {
    var config = angular.extend({
      autoSelectIndex: 0,
      user_id: flickrConfig.user_id || '99179128@N07'
    }, flickrConfig.photosetList);

    return {
      scope: {
        sets: '=',
        set: '=',
        setId: '=',
        listClass: '@',
        itemClass: '@'
      },
      restrict: 'EA',
      replace: true,
      // templateUrl: 'directives/photoset/photosetList.html',
      template: '<div>' + 
                  '<div class="input-group">' + 
                  '<span class="input-group-addon"><i class="glyphicon glyphicon-filter"></i></span>' +
                  '<input class="form-control" ng-model="filterPhotosets" placeholder="filter photo sets"/>' +
                  '</div>' + 
                  '<ul class="{{listClass}}"/>' + 
                  '<li ng-repeat="photoset in $sets.photosets.photoset | filter:filterPhotosets"  class="{{itemClass}}" ng-class="{active:set.id==selectedId}" ng-animate="\'photoset-list\'">' +
                    '<a ng-if="photoset.id !== set.id" href="" ng-click="setSelected(photoset)">{{photoset.title._content}}</a>' +
                    '<span ng-if="photoset.id == set.id">{{photoset.title._content}}</span>' +
                  '</li>' +
                '</ul></div>',

      link: function (scope, element, attrs) {
        flickrLoading.isLoading = true;
        scope.$sets = Photoset.query({ user_id: config.user_id }, function (sets) {
          if (sets && sets.photosets && sets.photosets.photoset &&
            sets.photosets.photoset.length && config.autoSelectIndex > -1) {
            // Set the initial selected thumbnail to the configured index.
            scope.setSelected(sets.photosets.photoset[0]);
          }

          flickrLoading.isLoading = false;
        });

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