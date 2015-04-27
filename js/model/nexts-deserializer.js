(function() {
  'use strict';

  var NextsDeserializer = {
    deserialize: function(param) {
      var i, len
        , value
        , radixConverter = new C.RadixConverter(64)
        , types = [];

      for (i = 0, len = param.length; i < len; i++) {
        value = radixConverter.convertToDecimal(param[i]);
        types.push('' + parseInt(value >> 3));
        types.push('' + (value & 7)); // 7 = 0x000111
      }

      if (types.length > 0 && types[types.length - 1] === C.CellType.None) {
        types.pop();
      }

      return types;
    }
  };

  C.NextsDeserializer = NextsDeserializer;
})();

