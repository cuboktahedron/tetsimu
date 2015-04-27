(function() {
  'use strict';

  var NextsSerializer = {
    serialize: function(types) {
      var i, len
        , value
        , result = ''
        , radixConverter = new C.RadixConverter(64);

      if (types.length % 2 != 0) {
        types.push(C.CellType.None);
      }

      for (i = 0, len = types.length; i < len; i += 2) {
        value = Number(types[i]) << 3;
        value += Number(types[i + 1]);
        result += radixConverter.convertFromDecimal(value);
      }

      return result;
    },
  };

  C.NextsSerializer = NextsSerializer;
})();

