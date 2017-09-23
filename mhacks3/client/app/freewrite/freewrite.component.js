'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './freewrite.routes';

export class FreewriteComponent {
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
    this.editorText;
  }

  test() {
    let editorText = this.editorText;
    //this.editorText = document.querySelector('#editor');
    console.log('first log: ', editorText);
    console.log(editorText.substring(editorText.length-1, editorText.length));
    if (editorText.substring(editorText.length-1, editorText.length) == " ") {
      console.log('it workd');
      this.$http.post('/api/things/test/check', {text: editorText})
        .then(response => {
          this.result = response.data;
          console.log(this.result);
        })
        .catch(console.log);
    }


  }
}

export default angular.module('mhacks3App.freewrite', [uiRouter])
  .config(routes)
  .component('freewrite', {
    template: require('./freewrite.html'),
    controller: FreewriteComponent,
    controllerAs: 'freewriteCtrl'
  })
  .name;
