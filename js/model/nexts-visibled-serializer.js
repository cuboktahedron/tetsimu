(function() {
  'use strict';

  var NextsVisibledSerializer = {
    serialize: function(visibledValue) {
      var radixConverter = new C.RadixConverter(64)
        , value = 0;

      value += (visibledValue[0] ? 0x01 : 0);
      value += (visibledValue[1] ? 0x02 : 0);
      value += (visibledValue[2] ? 0x04 : 0);
      value += (visibledValue[3] ? 0x08 : 0);
      value += (visibledValue[4] ? 0x10 : 0);

      return radixConverter.convertFromDecimal(value);
    }
  };

  C.NextsVisibledSerializer = NextsVisibledSerializer;
})();
