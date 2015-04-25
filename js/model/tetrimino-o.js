(function() {
  'use strict';

  var TetriminoO = function(pivot, direction) {
    C.Tetrimino.call(this, C.CellType.O, pivot, direction);
  };

  TetriminoO._Shape = {};
  TetriminoO._Shape[C.Direction.Up] = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 }
  ];

  TetriminoO._Shape[C.Direction.Left] = TetriminoO._Shape[C.Direction.Up];
  TetriminoO._Shape[C.Direction.Down] = TetriminoO._Shape[C.Direction.Up];
  TetriminoO._Shape[C.Direction.Right] = TetriminoO._Shape[C.Direction.Up];

  TetriminoO.prototype = $.extend({}, C.Tetrimino.prototype, {
    Shape: function() {
      return TetriminoO._Shape[this.direction()];
    }
  });

  C.TetriminoO = TetriminoO;
})();

