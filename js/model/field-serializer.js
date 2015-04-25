(function() {
  'use strict';

  var FieldSerializer = {
    serialize: function(types) {
      // フィールド固定サイズのみの対応とする
      var x, y
        , isBeginning = true
        , lineValue
        , lineStr
        , result = ''
        , radixConverter = new C.RadixConverter(64);

      for (y = C.Field.DEFAULT_HEIGHT - 1; y >= 0; y--) {
        lineValue = 0;
        lineStr = '';
        for (x = 0; x < C.Field.DEFAULT_WIDTH; x++) {
          lineValue = lineValue * (1 << 4);
          lineValue += (Number(types[y][x]));
        }

        if (isBeginning && lineValue !== 0) {
          isBeginning = false;
          lineStr = radixConverter.convertFromDecimal(lineValue);
        } else if (!isBeginning) {
          lineStr = radixConverter.convertFromDecimal(lineValue);
        }

        while (lineStr.length % 7 > 0) {
          lineStr = '0' + lineStr;
        }

        result += lineStr;
      }

      return result;
    }
  };

  C.FieldSerializer = FieldSerializer;
})();

