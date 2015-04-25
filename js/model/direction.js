(function() {
  'use strict';

  var Direction = {
    Up   : 1,
    Left : 2,
    Down : 4,
    Right: 8,

    turnLeft: function(dir) {
      switch (dir) {
        case Direction.Up: return Direction.Left;
        case Direction.Left: return Direction.Down;
        case Direction.Down: return Direction.Right;
        case Direction.Right: return Direction.Up;
        default: throw new Error('invalid direction(' + dir + ')'); 
      }
    },

    turnRight: function(dir) {
      switch (dir) {
        case Direction.Up: return Direction.Right;
        case Direction.Left: return Direction.Up;
        case Direction.Down: return Direction.Left;
        case Direction.Right: return Direction.Down;
        default: throw new Error('invalid direction(' + dir + ')'); 
      }
    }
  };

  C.Direction = Direction;
})();

