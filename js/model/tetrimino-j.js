(function() {
  'use strict';

  var TetriminoJ = function(pivot, direction) {
    C.Tetrimino.call(this, C.CellType.J, pivot, direction);
  };

  TetriminoJ._Shape = {};
  TetriminoJ._Shape[C.Direction.Up] = [
    { x:  0, y: 0 },
    { x: -1, y: 0 },
    { x:  1, y: 0 },
    { x: -1, y: 1 }
  ];

  TetriminoJ._Shape[C.Direction.Left] = [
    { x:  0, y:  0 },
    { x:  0, y: -1 },
    { x:  0, y:  1 },
    { x: -1, y: -1 }
  ];

  TetriminoJ._Shape[C.Direction.Down] = [
    { x:  0, y:  0 },
    { x:  1, y:  0 },
    { x: -1, y:  0 },
    { x:  1, y: -1 }
  ];

  TetriminoJ._Shape[C.Direction.Right] = [
    { x: 0, y:  0 },
    { x: 0, y:  1 },
    { x: 0, y: -1 },
    { x: 1, y:  1 }
  ];

  TetriminoJ.prototype = $.extend({}, C.Tetrimino.prototype, {
    Shape: function() {
      return TetriminoJ._Shape[this.direction()];
    }
  });

  C.TetriminoJ = TetriminoJ;
})();

