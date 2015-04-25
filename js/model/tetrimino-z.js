(function() {
  'use strict';

  var TetriminoZ = function(pivot, direction) {
    C.Tetrimino.call(this, C.CellType.Z, pivot, direction);
  };

  TetriminoZ._Shape = {};
  TetriminoZ._Shape[C.Direction.Up] = [
    { x:  0, y: 0 },
    { x:  1, y: 0 },
    { x:  0, y: 1 },
    { x: -1, y: 1 }
  ];

  TetriminoZ._Shape[C.Direction.Left] = [
    { x:  0, y:  0 },
    { x:  0, y:  1 },
    { x: -1, y:  0 },
    { x: -1, y: -1 }
  ];

  TetriminoZ._Shape[C.Direction.Down] = [
    { x:  0, y:  0 },
    { x: -1, y:  0 },
    { x:  0, y: -1 },
    { x:  1, y: -1 }
  ];

  TetriminoZ._Shape[C.Direction.Right] = [
    { x: 0, y:  0 },
    { x: 0, y: -1 },
    { x: 1, y:  0 },
    { x: 1, y:  1 }
  ];

  TetriminoZ.prototype = $.extend({}, C.Tetrimino.prototype, {
    Shape: function() {
      return TetriminoZ._Shape[this.direction()];
    }
  });

  C.TetriminoZ = TetriminoZ;
})();

