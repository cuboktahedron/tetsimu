(function() {
  'use strict';

  var TetriminoI = function(pivot, direction) {
    C.Tetrimino.call(this, C.CellType.I, pivot, direction);
  };

  TetriminoI._Shape = {};
  TetriminoI._Shape[C.Direction.Up] = [
    { x:  0, y: 0 },
    { x: -1, y: 0 },
    { x:  1, y: 0 },
    { x:  2, y: 0 }
  ];

  TetriminoI._Shape[C.Direction.Left] = [
    { x: 0, y: -1 },
    { x: 0, y: -2 },
    { x: 0, y:  0 },
    { x: 0, y:  1 }
  ];

  TetriminoI._Shape[C.Direction.Down] = [
    { x:  1, y: -1 },
    { x:  2, y: -1 },
    { x:  0, y: -1 },
    { x: -1, y: -1 }
  ];

  TetriminoI._Shape[C.Direction.Right] = [
    { x: 1, y:  0 },
    { x: 1, y:  1 },
    { x: 1, y: -1 },
    { x: 1, y: -2 }
  ];

  TetriminoI._SuperRotations = (function() {

    var srss = {
      left: {},
      right: {}
    };

    srss.left[C.Direction.Up] = [
      { x: -1, y:  0 },
      { x:  2, y:  0 },
      { x: -1, y:  2 },
      { x:  2, y: -1 }
    ];

    srss.left[C.Direction.Left] = [
      { x:  1, y:  0 },
      { x: -2, y:  0 },
      { x: -2, y: -1 },
      { x:  1, y:  2 }
    ];

    srss.left[C.Direction.Down] = [
      { x:  1, y:  0 },
      { x: -2, y:  0 },
      { x:  1, y: -2 },
      { x: -2, y:  1 }
    ];

    srss.left[C.Direction.Right] = [
      { x:  2, y:  0 },
      { x: -1, y:  0 },
      { x:  2, y:  1 },
      { x: -1, y: -2 }
    ];

    srss.right[C.Direction.Up] = [
      { x: -2, y:  0 },
      { x:  1, y:  0 },
      { x: -2, y: -1 },
      { x:  1, y:  2 }
    ];

    srss.right[C.Direction.Left] = [
      { x: -2, y:  0 },
      { x:  1, y:  0 },
      { x:  1, y: -2 },
      { x: -2, y:  1 }
    ];

    srss.right[C.Direction.Down] = [
      { x:  2, y:  0 },
      { x: -1, y:  0 },
      { x:  2, y:  1 },
      { x: -1, y: -2 }
    ];

    srss.right[C.Direction.Right] = [
      { x: -1, y:  0 },
      { x:  2, y:  0 },
      { x: -1, y:  2 },
      { x:  2, y: -1 }
    ];

    return srss;
  })();

  TetriminoI.prototype = $.extend({}, C.Tetrimino.prototype, {
    Shape: function() {
      return TetriminoI._Shape[this.direction()];
    },

    SuperRotationsLeft: function() {
      return TetriminoI._SuperRotations.left[this.direction()];
    },

    SuperRotationsRight: function() {
      return TetriminoI._SuperRotations.right[this.direction()];
    }
  });

  C.TetriminoI = TetriminoI;
})();

