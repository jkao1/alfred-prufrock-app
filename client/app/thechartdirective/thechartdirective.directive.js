'use strict';
const angular = require('angular');

export default angular.module('mhacks3App.thechartdirective', [])
  .directive('thechartdirective', function() {

    var link = function (scope, element, attrs) {

    };

    return {
      template: require('./thechartdirective.html'),
      replace: true,
      restrict: 'E',
      link: link
    };
  })
  .name;
