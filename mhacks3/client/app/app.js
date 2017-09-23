'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import 'angular-validation-match';
import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import FreewriteComponent from './freewrite/freewrite.component';
import TestComponent from './test/test.component';

import './app.scss';

angular.module('mhacks3App', [ngCookies, ngResource, ngSanitize, uiRouter, _Auth, account, admin,
  'validation.match', navbar, footer, main, constants, util, FreewriteComponent, TestComponent,
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }).
directive('contenteditable', ['$sce', function($sce) {
  return {
  restrict: 'A', // only activate on element attribute
  require: '?ngModel', // get a hold of NgModelController
  link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

    // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
        read(); // initialize
      };

      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });

      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  };
}]);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['mhacks3App'], {
      strictDi: true
    });
  });
