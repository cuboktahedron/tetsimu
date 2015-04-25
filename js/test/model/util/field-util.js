(function() {
  'use strict';

  var FieldUtil = {
    make: function(src) {
      var field = new C.Field()
        , x, y
        , lines;

      for (y = 0; y < C.Field.DEFAULT_HEIGHT; y++) {
        if (src[y] == null) {
          lines = [];
        } else {
          lines = src[y];
        }

        for (x = 0; x < C.Field.DEFAULT_WIDTH; x++) {
          if (lines[x] == null) {
            field.type(x, y, C.CellType.None);
          } else {
            field.type(x, y, lines[x]);
          }
        }
      }

      return field;
    }
  }

  C.FieldUtil = FieldUtil;
})();


