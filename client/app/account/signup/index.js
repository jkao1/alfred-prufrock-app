'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('mhacks3App.signup', [])
  .controller('SignupController', SignupController)
  .name;
