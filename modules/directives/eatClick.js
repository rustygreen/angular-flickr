angular.module('flickr.directives')
  .directive('eatClick', function () {
    return function (scope, element) {
      element.bind('click', function (event) {
        event.preventDefault();
      });
    }
  });