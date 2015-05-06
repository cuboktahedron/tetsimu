(function() {
  'use strict';

  var NextsVisibledDeserializer = {
    deserialize: function(param) {
      var radixConverter = new C.RadixConverter(64)
        , value = radixConverter.convertToDecimal(param)
        , visibled = [];

      visibled[0] = (value & 0x01) > 0;
      visibled[1] = (value & 0x02) > 0;
      visibled[2] = (value & 0x04) > 0;
      visibled[3] = (value & 0x08) > 0;
      visibled[4] = (value & 0x10) > 0;

      return visibled;
    }
  };

  C.NextsVisibledDeserializer = NextsVisibledDeserializer;
})();
