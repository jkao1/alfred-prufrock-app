'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('mhacks3App.util', [])
  .factory('Util', UtilService)
  .name;
