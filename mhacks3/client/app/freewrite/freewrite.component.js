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
    const { editorText } = this;
    const fixedText = editorText.replace("&nbsp;", " ");
    console.log(fixedText);
    if (fixedText.substring(fixedText.length-1) === " " || 
      fixedText.substring(fixedText.length-1) === "." || 
      fixedText.substring(fixedText.length-6) === "&nbsp;") {
      this.$http.post('/api/things/test/check', {text: fixedText.replace("&nbsp;", " ")})
        .then(response => {
          const entity = response.data[response.data.length - 1];
          this.entity = response.data[response.data.length - 1];
          const currentText = document.getElementById('editor').innerHTML;
          const n = currentText.lastIndexOf(entity.name);
          const bolded = currentText.replace(entity.name, `<b>${entity.name}</b>`);
          document.getElementById('editor').innerHTML = 
            currentText.slice(0, n) + bolded + currentText.slice(n + entity.name.length);
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
