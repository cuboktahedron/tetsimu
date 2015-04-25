(function() {
  'use strict';

  var TetriminoL = function(pivot, direction) {
    C.Tetrimino.call(this, C.CellType.L, pivot, direction);
  };

  TetriminoL._Shape = {};
  TetriminoL._Shape[C.Direction.Up] = [
    { x:  0, y: 0 },
    { x: -1, y: 0 },
    { x:  1, y: 0 },
    { x:  1, y: 1 }
  ];

  TetriminoL._Shape[C.Direction.Left] = [
    { x:  0, y:  0 },
    { x:  0, y: -1 },
    { x:  0, y:  1 },
    { x: -1, y:  1 }
  ];

  TetriminoL._Shape[C.Direction.Down] = [
    { x:  0, y:  0 },
    { x:  1, y:  0 },
    { x: -1, y:  0 },
    { x: -1, y: -1 }
  ];

  TetriminoL._Shape[C.Direction.Right] = [
    { x: 0, y:  0 },
    { x: 0, y:  1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 }
  ];

  TetriminoL.prototype = $.extend({}, C.Tetrimino.prototype, {
    Shape: function() {
      return TetriminoL._Shape[this.direction()];
    }
  });

  C.TetriminoL = TetriminoL;
})();

