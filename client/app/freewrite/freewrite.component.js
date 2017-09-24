'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './freewrite.routes';

import thechartdirective from '../thechartdirective/thechartdirective.directive';

export class FreewriteComponent {
  /*@ngInject*/
  constructor($http, $scope) {
    this.message = 'Hello';
    this.$http = $http;
    this.editorText;
    this.testText = 'test text here';
    this.result = [];
    this.leafNumber = 0;
    this.oldEntities = [];
  }

  test() {
    let editorText = this.editorText;
    //this.editorText = document.querySelector('#editor');
    if (editorText.substring(editorText.length-1, editorText.length) == " ") {
      this.$http.post('/api/things/test/check', {text: editorText})
        .then(response => {
          this.result = response.data;
          console.log(this.result);
        })
        .catch(console.log);
    }
  }

  save() {
    this.$http.post('/api/users/saveSession', {text: 'some text'})
      .then(result => {
        //console.log(result);
      })
      .catch(console.log);
  }

}

export default angular.module('mhacks3App.freewrite', [uiRouter])
  .config(routes)
  .component('freewrite', {
    template: require('./freewrite.html'),
    controller: FreewriteComponent,
    controllerAs: 'freewriteCtrl'
  })
  .directive('mindMap', function() {

    var link = function($scope, element, attributes) {
      console.log('this printed: ', $scope.freewriteCtrl.result);

      function findNewEntity(newList, oldList) {
        let lenNew = newList.length;
        let lenOld = oldList.length;
        let visited = [];
        if (lenOld == 0) return newList[0];
        for(let i = 0; i < lenNew; i++) {
          for(let j = 0; j < lenOld; j++) {
            if (visited.length == lenOld) {
              return newList[i];
            }

            if (newList[i] == oldList[j] && !visited.includes(j)) {
              visited.push(j);
            }

          }
        }
      };

      var update = function() {
        console.log($scope.freewriteCtrl.result, null, 2);
        if ($scope.freewriteCtrl.result.length != 0) {
          console.log('updated result ', $scope.freewriteCtrl.result);
          /*
          let numEntities= $scope.freewriteCtrl.result.length;
          let lastEntity = $scope.freewriteCtrl.result[numEntities - 1];
          console.log(lastEntity);
          */
          let newEntity = findNewEntity($scope.freewriteCtrl.result, $scope.freewriteCtrl.oldEntities);
          tree.addLeaf($scope.freewriteCtrl.leafNumber, newEntity);
          $scope.freewriteCtrl.leafNumber++;
          $scope.freewriteCtrl.oldEntities = $scope.freewriteCtrl.result;
        }
      };

      $scope.$watchCollection('freewriteCtrl.result', update, true);
    }

    return {
      template: '<div>Hello{{freewriteCtrl.result}}</div>',
      link: link,
      restrict: 'E',
      replace: true
    };
  })
  .name;
