(function() {
  'use strict';

  var Nexts = function() {
    this._p = -1;
    this._types = [];
  };

  Nexts.prototype = {
    push: function(type) {
      this._types.push(type);
    },

    no: function(v) {
      if (v === undefined) {
        // get
        return this._p;
      } else {
        // set
        this._p = v;
      }
    },

    next: function() {
      this._p++;
      return this._types[this._p];
    },

    types: function(v) {
      if (v === undefined) {
        // get
        return this._types.concat();
      } else {
        // set
        this._types = v.concat();
        this._p = -1;
      }
    },

    nextTypes: function() {
      var types = this._types.concat();
      types.splice(0, this._p + 1);
      return types;
    },

    length: function() {
      return this._types.length;
    },

    nextsLength: function() {
      return this._types.length - (this._p + 1);
    },

    serialize: function() {
      var i, len
        , types = this.nextTypes()
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

      this._p = -1;
      this.types(types);
    }
  };

  C.Nexts = Nexts;
})();

