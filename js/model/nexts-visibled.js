(function() {
  'use strict';

  var NextsVisibled = function() {
    this._visibled = [true, true, true, true, true];
  };

  NextsVisibled.prototype = {
    status: function() {
      return this._visibled.concat();
    },

    toggleVisible: function(index) {
      if (index < 0 || index >= 5) {
        throw new Error('out of bounds index(' + index + ')');
      }

      this._visibled[index] = !this._visibled[index];
    },

    serialize: function() {
      return C.NextsVisibledSerializer.serialize(this._visibled);
    },

    deserialize: function(param) {
      this._visibled = C.NextsVisibledDeserializer.deserialize(param);
    }
  };

  C.NextsVisibled = NextsVisibled;
})();

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

