'use strict';

angular.module('flickrApp')
  .controller('NavCtrl', function ($scope, navConfig) {
    $scope.navs = navConfig;
  });
