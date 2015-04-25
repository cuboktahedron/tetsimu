(function() {
  'use strict';

  var FieldDeserializer = {
    deserialize: function(typesValue) {
      // フィールド固定サイズのみの対応とする
      typesValue = typesValue || ''
      var types = []
        , lackOfCharacterNum = C.Field.DEFAULT_HEIGHT * 7 - typesValue.length
        , i, j
        , lineValue
        , modValue
        , radixConverter = new C.RadixConverter(64);

      for (i = 0; i < lackOfCharacterNum; i++) {
        typesValue = '0' + typesValue;
      }

      for (i = C.Field.DEFAULT_HEIGHT - 1; i >= 0; i--) {
        types[i] = [];

        lineValue = radixConverter.convertToDecimal(typesValue.substring(0, 7));
        typesValue = typesValue.substring(7);

        for (j = C.Field.DEFAULT_WIDTH - 1; j >= 0 ; j--) {
          modValue = lineValue % (1 << 4);
          types[i][j] = '' + modValue;
          lineValue = (lineValue - modValue) / (1 << 4);
        }
      }

      return types;
    }
  };

  C.FieldDeserializer = FieldDeserializer;
})();

