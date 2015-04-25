(function() {
  'use strict';

  var Field = function() {
    var that = this;
    this._width = Field.DEFAULT_WIDTH;
    this._height = Field.DEFAULT_HEIGHT;
    this._innerHeight = Field.DEFAULT_INNER_HEIGHT;
    this._types = [];

    this.deserialize();

    this._EmptyLine = (function() {
      var emptyLine = []
        , x;
      for (x = 0; x <= that._maxWidth(); x++) {
        emptyLine.push(C.CellType.None);
      }

      return emptyLine;
    })();
  };

  Field.DEFAULT_HEIGHT = 25;
  Field.DEFAULT_INNER_HEIGHT = 21;
  Field.DEFAULT_WIDTH = 10;

  Field.prototype = {
    innerTypes: function() {
      var types = this.types().concat();
      types.splice(this._innerHeight, this._height - this._innerHeight);
      return types;
    },

    types: function() {
      return this._types;
    },

    deserialize: function(param) {
      this._types = C.FieldDeserializer.deserialize(param);
    },

    serialize: function() {
      return C.FieldSerializer.serialize(this.types());
    },

    type: function(x, y, v) {
      if (v === undefined) {
        // get
        if (this._isOutOfField(x, y)) {
          return C.CellType.Wall;
        } else {
          return this._types[y][x];
        }

      } else {
        // set

        if (!this._isOutOfField(x, y)) {
          this._types[y][x] = v;
        }
      }
    },

    _isOutOfField: function(x, y) {
      return x < 0 || x > this._maxWidth() || y < 0 || y > this._maxHeight();
    },

    _maxWidth: function() {
      return this._width - 1;
    },

    _maxHeight: function() {
      return this._height - 1;
    },

    isGround: function(tetrimino) {
      var p
        , block
        , blocks = tetrimino.blocks();
      for (p in blocks) {
        block = blocks[p];
        if (C.CellType.isBlock(this.type(block.x, block.y - 1))) {
          return true;
        }
      }

      return false;
    },

    settle: function(tetrimino) {
      var blocks = tetrimino.blocks()
        , block
        , p;
      for (p in blocks) {
        block = blocks[p];
        this.type(block.x, block.y, tetrimino.type());
      }
    },

    clearLine: function() {
      var clearLineNum = 0
        , x, y
        , isLineClear;

      for (y = 0; y <= this._maxHeight(); y++) {
        isLineClear = true;
        for (x = 0; x <= this._maxWidth(); x++) {
          if (!C.CellType.isBlock(this.type(x, y))) {
            isLineClear = false;
            break;
          }
        }

        if (isLineClear) {
          clearLineNum++;
          this._types.splice(y, 1);
          this._types.push(this._EmptyLine.concat());
          y--;
        }
      }

      return clearLineNum;
    },

    startPivot: function() {
      return {
        x: this._width / 2 - 1,
        y: this._innerHeight - 2,
      };
    }
  };

  C.Field = Field;
})();

