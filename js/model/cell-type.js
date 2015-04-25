(function() {
  'use strict';

  var CellType = {
    None: '0',
    I: '1',
    J: '2',
    L: '3',
    O: '4',
    S: '5',
    T: '6',
    Z: '7',
    Ojama: '8',
    Wall: '9',

    isBlock: function(type) {
      return type >= C.CellType.I && type <= C.CellType.Wall;
    }
  };

  C.CellType = CellType;
})();

