'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('test', {
      url: '/test',
      template: '<test></test>'
    });
}
