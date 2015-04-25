(function() {
  var RadixConverter = function (base) {
    this._base = base;
  };

  RadixConverter._BaseChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
  RadixConverter._BaseChars2NumMap = (function() {
    var c
      , i
      , len
      , map = {};

    for (i = 0, len = RadixConverter._BaseChars.length; i < len; i++) {
      c = RadixConverter._BaseChars.charAt(i);
      map[c] = i;
    }

    return map;
  })();

  RadixConverter.prototype = {
    convertFromDecimal: function(decimal) {
      var str = ''
        , p
        , q;
      do {
        p = Math.floor(decimal / this._base);
        q = decimal % this._base;
        str = RadixConverter._BaseChars.charAt(q) + str;
        decimal = p;
      } while (decimal > 0);

      return str;
    },

    convertToDecimal: function(str) {
      var sum = 0
        , i
        , len;
      for (i = 0, len = str.length; i < len; i++) {
        if (i !== 0) {
          sum *= this._base;
        }
        var c = str.charAt(i);
        sum += RadixConverter._BaseChars2NumMap[c];
      }
      return sum;
    }
  };

  C.RadixConverter = RadixConverter;
})();

