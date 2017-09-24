'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('freewrite', {
      url: '/freewrite',
      template: '<freewrite></freewrite>'
    });
}
