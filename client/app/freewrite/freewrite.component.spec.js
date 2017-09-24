'use strict';

describe('Component: FreewriteComponent', function() {
  // load the controller's module
  beforeEach(module('mhacks3App.freewrite'));

  var FreewriteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FreewriteComponent = $componentController('freewrite', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
