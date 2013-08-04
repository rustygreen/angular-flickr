'use strict';

angular.module('flickrApp', ['flickr'])
  .config(function ($routeProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.useXDomain = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .value('flickrConfig', {
    user_id: '99179128@N07',
    api_key: '006d5ace5a1ec6e87d501a2753da1bc7'
  })

  .run(function ($rootScope) {
  });