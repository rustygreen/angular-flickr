(function () {
  'use strict';

  var navs = [
    {
      title: 'Photoset Panel', path: '/photoset/panel', templateUrl: 'views/photoset/panel.html', controller: 'MainCtrl'
    },
    {
      title: 'Photoset Explorer', path: '/photoset/explorer', templateUrl: 'views/photoset/explorer.html', controller: 'MainCtrl'
    },
    {
      title: 'Photoset Slideshow', path: '/photoset/slideshow', templateUrl: 'views/photoset/slideshow.html', controller: 'MainCtrl'
    }
  ];

  angular.module('flickrApp', ['flickr'])
    .config(function ($routeProvider, $httpProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $httpProvider.defaults.useXDomain = true;

      angular.forEach(navs, function (nav) {
        $routeProvider.when(nav.path, nav);
      });

      $routeProvider
        .otherwise({
          redirectTo: navs[0].path
        });
    })

    .value('navConfig', navs)

    .value('flickrConfig', {
      user_id: '99179128@N07',
      api_key: '006d5ace5a1ec6e87d501a2753da1bc7'
    })

    .run(function ($rootScope, $location) {
      $rootScope.active = function (path) {
        return $location.path() === path ? 'active' : '';
      };
    });
})();