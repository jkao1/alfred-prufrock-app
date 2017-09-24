'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './freewrite.routes';

(function( cursorManager ) {

    //From: http://www.w3.org/TR/html-markup/syntax.html#syntax-elements
    var voidNodeTags = ['AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'MENUITEM', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR', 'BASEFONT', 'BGSOUND', 'FRAME', 'ISINDEX'];

    //From: https://stackoverflow.com/questions/237104/array-containsobj-in-javascript
    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    //Basic idea from: https://stackoverflow.com/questions/19790442/test-if-an-element-can-contain-text
    function canContainText(node) {
        if(node.nodeType == 1) { //is an element node
            return !voidNodeTags.contains(node.nodeName);
        } else { //is not an element node
            return false;
        }
    };

    function getLastChildElement(el){
        var lc = el.lastChild;
        while(lc && lc.nodeType != 1) {
            if(lc.previousSibling)
                lc = lc.previousSibling;
            else
                break;
        }
        return lc;
    }

    //Based on Nico Burns's answer
    cursorManager.setEndOfContenteditable = function(contentEditableElement)
    {

        while(getLastChildElement(contentEditableElement) &&
              canContainText(getLastChildElement(contentEditableElement))) {
            contentEditableElement = getLastChildElement(contentEditableElement);
        }

        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {    
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }

}( window.cursorManager = window.cursorManager || {}));

export class FreewriteComponent {
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
    this.editorText;
    this.lastReplace;
  }

  test() { 
    const { editorText } = this;
    const fixedText = editorText.replace(" ", " ");
    console.log(fixedText);
    if (fixedText.substring(fixedText.length-6) === "&nbsp;") {
      this.$http.post('/api/things/test/check', {text: fixedText})
        .then(response => {
          console.log(response);
          if (response.data && 
            response.data.length > 0 && 
            response.data[response.data.length - 1].name !== this.lastReplace.name && 
            response.data[response.data.length - 1].name.length > 2 &&
            response.data[response.data.length - 1].type !== "OTHER" && 
            response.data[response.data.length - 1].type !== "ORGANIZATION") {
            const entity = response.data[response.data.length - 1];
            const currentText = document.getElementById('editor').innerHTML;
            const editor = document.getElementById('editor');
            this.lastReplace = entity;

            const isPeriod = fixedText.substring(fixedText.length-7) === ".&nbsp;";
            const backUp = isPeriod ? 7 : 6;
            editor.innerHTML = 
              currentText.slice(0, currentText.length - backUp - entity.name.length) + `<a href=''>${entity.name}${isPeriod ? "." : ""}&nbsp;</a>`;// + "<a href=''>" + entity.name + "</a>&nbsp;";
            cursorManager.setEndOfContenteditable(editor);
            }
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
