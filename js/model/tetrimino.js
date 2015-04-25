(function() {
  'use strict';

  var Tetrimino = function(type, pivot, direction) {
    this.type(type);
    this.pivot(pivot || { x: 0, y: 0 });
    this.direction(direction || C.Direction.Up);
  };

  Tetrimino._SuperRotations = (function() {

    var srss = {
      left: {},
      right: {}
    };

    srss.left[C.Direction.Up] = [
      { x:  1, y:  0 },
      { x:  1, y:  1 },
      { x:  0, y: -2 },
      { x:  1, y: -2 }
    ];

    srss.left[C.Direction.Left] = [
      { x: -1, y:  0 },
      { x: -1, y: -1 },
      { x:  0, y:  2 },
      { x: -1, y:  2 }
    ];

    srss.left[C.Direction.Down] = [
      { x: -1, y:  0 },
      { x: -1, y:  1 },
      { x:  0, y: -2 },
      { x: -1, y: -2 }
    ];

    srss.left[C.Direction.Right] = [
      { x: 1, y:  0 },
      { x: 1, y: -1 },
      { x: 0, y:  2 },
      { x: 1, y:  2 }
    ];

    srss.right[C.Direction.Up] = [
      { x: -1, y:  0 },
      { x: -1, y:  1 },
      { x:  0, y: -2 },
      { x: -1, y: -2 }
    ];

    srss.right[C.Direction.Left] = [
      { x: -1, y:  0 },
      { x: -1, y: -1 },
      { x:  0, y:  2 },
      { x: -1, y:  2 }
    ];

    srss.right[C.Direction.Down] = [
      { x:  1, y:  0 },
      { x:  1, y:  1 },
      { x:  0, y: -2 },
      { x:  1, y: -2 }
    ];

    srss.right[C.Direction.Right] = [
      { x:  1, y:  0 },
      { x:  1, y: -1 },
      { x:  0, y:  2 },
      { x:  1, y:  2 }
    ];

    return srss;
  })();

  Tetrimino.prototype = {
    SuperRotationsLeft: function() {
      return Tetrimino._SuperRotations.left[this.direction()];
    },

    SuperRotationsRight: function() {
      return Tetrimino._SuperRotations.right[this.direction()];
    },

    pivot: function(pivot) {
      if (pivot === undefined) {
        // get
        return this._pivot;
      } else {
        // set
        this._pivot = pivot;
      }
    },

    direction: function(dir) {
      if (dir === undefined) {
        // get
        return this._direction;
      } else {
        // set
        this._direction = dir;
      }
    },

    type: function(type) {
      if (type === undefined) {
        // get
        return this._type;
      } else {
        // set
        this._type = type;
      }
    },

    turnLeft: function() {
      this.direction(C.Direction.turnLeft(this.direction()));
    },

    turnRight: function() {
      this.direction(C.Direction.turnRight(this.direction()));
    },

    blocks: function() {
      var that = this
        , shape = this.Shape();
      return shape.map(function(pt, i) {
        return {
          x: pt.x + that.pivot().x,
          y: pt.y + that.pivot().y
        };
      });
    },

    copy: function() {
      return $.extend(true, {}, this);
    },

    hardDrop: function(field) {
      var i = 0;
      var pivot;
      while (!field.isGround(this)) {
        pivot = this.pivot();
        pivot.y--;
        this.pivot(pivot);
        i++;

        if (i > 100) break;
      }
    },

    move: function(movement) {
      var pivot = this.pivot();
      pivot.x += movement.x;
      pivot.y += movement.y;
      this.pivot(pivot);
    },

    canMove: function(field, movement) {
      var copied = this.copy()
        , blocks
        , block
        , p;

      copied.move(movement);

      blocks = copied.blocks();
      for (p in blocks) {
        block = blocks[p];
        if (C.CellType.isBlock(field.type(block.x, block.y))) {
          return false;
        }
      }

      return true;
    },

    turnLeftIfPossible: function(field, specialInfo) {
      this._initSpecialInfo(specialInfo);
      this.turnLeft();

      if (this._isOverwrap(field)) {
        // undo
        this.turnRight();
        return false;
      }

      return true;
    },

    _isOverwrap: function(field) {
      var blocks = this.blocks()
        , block
        , p;

      for (p in blocks) {
        block = blocks[p];
        if (C.CellType.isBlock(field.type(block.x, block.y))) {
          return true;
        }
      }

      return false;
    },

    turnLeftSuperlyIfPossible: function(field, specialInfo) {
      this._initSpecialInfo(specialInfo);

      var sr = this.SuperRotationsLeft()
        , i
        , len
        , conditions;

      if (this._turnLeftSuperlyIfPossible(field, sr, specialInfo)) {
        return true;
      }

      return false;
    },

    _turnLeftSuperlyIfPossible: function(field, sr, specialInfo) {
      var i
        , len
        , pivot = this.pivot();

      this.turnLeft();
      for (i = 0, len = sr.length; i < len; i++) {
        this.pivot({ x: pivot.x + sr[i].x, y: pivot.y + sr[i].y});

        if (!this._isOverwrap(field)) {
          specialInfo._option = sr.option || {};
          return true;
        }

        // undo
        this.pivot(pivot);
      }

      // undo
      this.turnRight();
      return false;
    },

    turnRightIfPossible: function(field, specialInfo) {
      this._initSpecialInfo(specialInfo);
      this.turnRight();

      if (this._isOverwrap(field)) {
        // undo
        this.turnLeft();
        return false;
      }

      return true;
    },

    turnRightSuperlyIfPossible: function(field, specialInfo) {
      this._initSpecialInfo(specialInfo);

      var sr = this.SuperRotationsRight()
        , i
        , len
        , conditions;

      if (this._turnRightSuperlyIfPossible(field, sr, specialInfo)) {
        return true;
      }

      return false;
    },

    _turnRightSuperlyIfPossible: function(field, sr, specialInfo) {
      var i
        , len
        , pivot = this.pivot();

      this.turnRight();
      for (i = 0, len = sr.length; i < len; i++) {
        this.pivot({ x: pivot.x + sr[i].x, y: pivot.y + sr[i].y});

        if (!this._isOverwrap(field)) {
          specialInfo._option = sr.option || {};
          return true;
        }

        // undo
        this.pivot(pivot);
      }

      // undo
      this.turnLeft();
      return false;
    },

    _initSpecialInfo: function(specialInfo) {
      $.extend(specialInfo, {
        spinType: C.Constants.SpinType.None
      });
    }
  };

  Tetrimino.makeRotationPattern = function(base, direction) {
    // x' = x・cos - y・sin
    // y' = x・sin + y・cos

    var cos
      , sin
      , newSr = $.extend(true, [], base)
      , i, srLen
      , sr
      , j, conditionLen
      , condition
      , movement;

    switch (direction) {
      case C.Direction.Up:
        cos = 1; sin = 0; break;
      case C.Direction.Left:
        cos = 0; sin = 1; break;
      case C.Direction.Down:
        cos = -1; sin = 0; break;
      case C.Direction.Right:
        cos = 0; sin = -1; break;
    }

    for (i = newSr.length - 1; i >= 0; i--) {
      // パターン生成対象の方向ではない場合、要素を削除していくので処理しやすいように逆順に回す
      sr = newSr[i];
      if (sr.targets.indexOf(direction) != -1) {
        for (j = 0, conditionLen = sr.conditions.length; j < conditionLen; j++) {
          sr.conditions[j] = {
            x: sr.conditions[j].x * cos - sr.conditions[j].y * sin,
            y: sr.conditions[j].x * sin + sr.conditions[j].y * cos
          };
        }

        sr.movement = {
          x: sr.movement.x * cos - sr.movement.y * sin,
          y: sr.movement.x * sin + sr.movement.y * cos
        };
      } else {
        newSr.splice(i, 1);
      }
    }

    return newSr;
  };

  Tetrimino.makeFlipHorizonPattern = function(base) {
    var srss = $.extend(true, {}, base)
      , srs
      , sr
      , swap
      , p
      , i, iLen
      , j, conditionLen;

    swap = srss[C.Direction.Left];
    srss[C.Direction.Left] = srss[C.Direction.Right];
    srss[C.Direction.Right] = swap;

    for (p in srss) {
      srs = srss[p];
      for (i = 0, iLen = srs.length; i < iLen; i++) {
        sr = srs[i];
        for (j = 0, conditionLen = sr.conditions.length; j < conditionLen; j++) {
          sr.conditions[j] = {
            x: -sr.conditions[j].x,
            y: sr.conditions[j].y
          };
        }

        sr.movement = {
          x: -sr.movement.x,
          y: sr.movement.y
        };
      }
    }

    return srss;
  };

  C.Tetrimino = Tetrimino;
})();

(function() {
  var TetriminoFactory = {
    create: function(type, pivot, direction) {
      switch (type) {
        case C.CellType.I:
          return new C.TetriminoI(pivot, direction);
        case C.CellType.J:
          return new C.TetriminoJ(pivot, direction);
        case C.CellType.L:
          return new C.TetriminoL(pivot, direction);
        case C.CellType.O:
          return new C.TetriminoO(pivot, direction);
        case C.CellType.S:
          return new C.TetriminoS(pivot, direction);
        case C.CellType.T:
          return new C.TetriminoT(pivot, direction);
        case C.CellType.Z:
          return new C.TetriminoZ(pivot, direction);
        default:
          throw new Error('invalid tetrimino type(' + type + ')');
      }
    }
  };

  C.TetriminoFactory = TetriminoFactory;
})();

