(function() {
  var converter;

  module('RadixConverterTest', {
    setup: function() {
      converter = new C.RadixConverter(64);
    }
  });

  test('10進数=>64進数に変換できること', function() {
    deepEqual(converter.convertFromDecimal(139), '2b');
  });

  test('64進数=>10進数に変換できること', function() {
    deepEqual(converter.convertToDecimal('2b'), 139);
  });
})();

