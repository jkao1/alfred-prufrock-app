'use strict';

describe('Directive: thechartdirective', function() {
  // load the directive's module and view
  beforeEach(module('mhacks3App.thechartdirective'));
  beforeEach(module('app/thechartdirective/thechartdirective.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<thechartdirective></thechartdirective>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the thechartdirective directive');
  }));
});
