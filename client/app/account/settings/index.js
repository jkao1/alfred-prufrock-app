'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('mhacks3App.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
