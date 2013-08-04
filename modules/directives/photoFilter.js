'use strict';

angular.module('flickr.directives')
  .directive('photoFilter', function (Photoset) {
    return {
      scope: {
        search: '='
      },
      restrict: 'EA',
      replace: true,
      template: '<div class="row">' +
                  '<div class="col-lg-12">' +
                    '<a href="" ng-click="visible=!visible">' +
                      '<i ng-class="{btn:true, glyphicon:true, \'glyphicon-chevron-down\': !visible, \'glyphicon-chevron-up\': visible}"></i> Filter Options' +
                    '</a>' +
                    '<div ng-show="visible">' +
                    '<div class="input-group">' +
                      '<span class="input-group-addon glyphicon glyphicon-search"></span>' +
                      '<input type="text" class="form-control" ng-model="search.filter" placeholder="Search">' +
                    '</div>' +
                    '<div class="input-group">' +
                      '<span class="input-group-addon glyphicon glyphicon-sort-by-attributes"></span>' +
                      '<select class="form-control" placeholder="Order By">' +
                        '<option value="item.value" ng-repeat="item in orders">{{item.text}}</option>' +
                      '</select>' +
                    '</div>' +
                    '<div class="input-group">' +
                      '<span class="input-group-addon glyphicon glyphicon-filter"></span>' +
                      '<select class="form-control" placeholder="Limit To">' +
                        '<option value="item.value" ng-repeat="item in limits">{{item.text}}</option>' +
                      '</select>' +
                    '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>',

      link: function (scope) {
        if (!scope.search) {
          scope.orders = [
            {text: 'Date', value: 'date'}
          ];

          scope.limits = [
            {text: '25', value: '25'},
            {text: '50', value: '50'},
            {text: '75', value: '75'},
            {text: '100', value: '100'},
            {text: 'No Limit', value: ''}
          ];

          scope.search = {filter: '', order: '', limit: 100}
        }
      }
    };
  });