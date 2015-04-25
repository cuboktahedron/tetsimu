(function() {
  'use strict';

  var Hold = function() {
    this._type = C.CellType.None;
    this._canExchange = true;
  };

  Hold.prototype = {
    type: function(v) {
      if (v === undefined) {
        // get
        return this._type;
      } else {
        // set
        this._type = v;
      }
    },

    exchange: function(next) {
      if (!this._canExchange) {
        throw new Error('Cannot exchange');
      }

      var prev = this.type();
      this.type(next);
      this._canExchange = false;
      return prev;
    },

    canExchange: function() {
      return this._canExchange;
    },

    release: function() {
      this._canExchange = true;
    },

    deserialize: function(param) {
      var radixConverter = new C.RadixConverter(64)
        , value;
      param = param || '0';

      value = radixConverter.convertToDecimal(param);
      this.type('' + ((value & 14) >> 1)); // 14 = 0b1110
      this._canExchange = ((value & 1) === 0); // 1 = 0b0001
    },

    serialize: function() {
      var radixConverter = new C.RadixConverter(64)
        , value;

      value = Number(this.type()) << 1;
      value += (this.canExchange() ? 0 : 1);

      return radixConverter.convertFromDecimal(value);
    }
  };

  C.Hold = Hold;
})();

