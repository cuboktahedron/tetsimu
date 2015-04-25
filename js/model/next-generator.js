(function() {
  'use strict';

  var NextGenerator = function() {
    this._currentSet = [];
  };

  NextGenerator.Types = [
    C.CellType.I,
    C.CellType.J,
    C.CellType.L,
    C.CellType.O,
    C.CellType.S,
    C.CellType.T,
    C.CellType.Z
  ];

  NextGenerator.prototype = {
    next: function() {
      var index, type;

      if (this._currentSet.length == 0) {
        this._currentSet = NextGenerator.Types.concat();
      }

      index = C.Random.nextInt(this._currentSet.length);
      type = this._currentSet[index];
      this._currentSet.splice(index, 1);

      return type;
    }
  };

  C.NextGenerator = NextGenerator;
})();

