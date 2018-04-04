angular.module('flickr.directives')
  .directive('imgAnimate', function ($animator) {
    return function (scope, element, attrs) {
      var animator = $animator(scope, attrs);

      element.bind('load', function (event) {
        animator.animate('photoset-thumbnails', element);
      });
    }
  });
