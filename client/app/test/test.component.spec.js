'use strict';

describe('Component: TestComponent', function() {
  // load the controller's module
  beforeEach(module('mhacks3App.test'));

  var TestComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TestComponent = $componentController('test', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
