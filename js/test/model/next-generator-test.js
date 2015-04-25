(function() {
  'use strict';

  var generator;

  module('NextGeneratorTest', {
    setup: function() {
      generator = new C.NextGenerator();
    }
  });

  test('7種類が均等に生成されること', function() {
    var types = [], i;

    for (i = 0; i < 14; i++) {
      types.push(generator.next());
    }

    deepEqual($.grep(types, function(v) { return v === C.CellType.I }).length, 2);
    deepEqual($.grep(types, function(v) { return v === C.CellType.J }).length, 2);
    deepEqual($.grep(types, function(v) { return v === C.CellType.L }).length, 2);
    deepEqual($.grep(types, function(v) { return v === C.CellType.O }).length, 2);
    deepEqual($.grep(types, function(v) { return v === C.CellType.S }).length, 2);
    deepEqual($.grep(types, function(v) { return v === C.CellType.T }).length, 2);
    deepEqual($.grep(types, function(v) { return v === C.CellType.Z }).length, 2);
  });
})();

