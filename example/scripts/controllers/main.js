'use strict';

angular.module('flickrApp')
  .controller('MainCtrl', function ($scope, flickrLoading) {
    $scope.flickrLoading = flickrLoading;
  });
