(function() {
  'use strict';

  var TetriminoT = function(pivot, direction) {
    C.Tetrimino.call(this, C.CellType.T, pivot, direction);
  };

  TetriminoT._Shape = {};
  TetriminoT._Shape[C.Direction.Up] = [
    { x:  0, y: 0 },
    { x: -1, y: 0 },
    { x:  1, y: 0 },
    { x:  0, y: 1 }
  ];

  TetriminoT._Shape[C.Direction.Left] = [
    { x:  0, y:  0 },
    { x: -1, y:  0 },
    { x:  0, y:  1 },
    { x:  0, y: -1 }
  ];

  TetriminoT._Shape[C.Direction.Down] = [
    { x:  0, y:  0 },
    { x: -1, y:  0 },
    { x:  1, y:  0 },
    { x:  0, y: -1 }
  ];

  TetriminoT._Shape[C.Direction.Right] = [
    { x: 0, y:  0 },
    { x: 1, y:  0 },
    { x: 0, y:  1 },
    { x: 0, y: -1 }
  ];

  TetriminoT.prototype = $.extend({}, C.Tetrimino.prototype, {
    Shape: function() {
      return TetriminoT._Shape[this.direction()];
    },

    turnLeftIfPossible: function(field, specialInfo) {
      if (!C.Tetrimino.prototype.turnLeftIfPossible.apply(this, arguments)) {
        return false;
      }

      if (this._metTSpin(field)) {
        specialInfo.spinType = C.Constants.SpinType.TSpin;
      }

      return true;
    },

    turnLeftSuperlyIfPossible: function(field, specialInfo) {
      if (!C.Tetrimino.prototype.turnLeftSuperlyIfPossible.apply(this, arguments)) {
        return false;
      }

      if (this._metTSpin(field)) {
        if (this.canTSpin(field)) {
          specialInfo.spinType = C.Constants.SpinType.TSpin;
        } else {
          specialInfo.spinType = C.Constants.SpinType.TSpinMini;
        }
      }

      return true;
    },

    turnRightIfPossible: function(field, specialInfo) {
      if (!C.Tetrimino.prototype.turnRightIfPossible.apply(this, arguments)) {
        return false;
      }

      if (this._metTSpin(field)) {
        specialInfo.spinType = C.Constants.SpinType.TSpin;
      }

      return true;
    },

    turnRightSuperlyIfPossible: function(field, specialInfo) {
      if (!C.Tetrimino.prototype.turnRightSuperlyIfPossible.apply(this, arguments)) {
        return false;
      }

      if (this._metTSpin(field)) {
        if (this.canTSpin(field)) {
          specialInfo.spinType = C.Constants.SpinType.TSpin;
        } else {
          specialInfo.spinType = C.Constants.SpinType.TSpinMini;
        }
      }

      return true;
    },

    _metTSpin: function(field) {
      var pivot = this.pivot()
        , count = 0;

      if (C.CellType.isBlock(field.type(pivot.x - 1, pivot.y - 1))) count++;
      if (C.CellType.isBlock(field.type(pivot.x + 1, pivot.y - 1))) count++;
      if (C.CellType.isBlock(field.type(pivot.x - 1, pivot.y + 1))) count++;
      if (C.CellType.isBlock(field.type(pivot.x + 1, pivot.y + 1))) count++;

      return count >= 3;
    },

    canTSpin: function(field) {
      var canTSpin
      this.turnRight();

      canTSpin = !this._isOverwrap(field);
      this.turnLeft();

      return canTSpin;
    }
  });

  C.TetriminoT = TetriminoT;
})();

