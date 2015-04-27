(function() {
  'use strict';

  var NextGenerator = function() {
    this.reset();
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
    },

    removeTypes: function(removeTypes) {
      this._currentSet = this._currentSet.filter(function(type) {
        return removeTypes.indexOf(type) === -1;
      });
    },

    reset: function() {
      this._currentSet = NextGenerator.Types.concat();
    }
  };

  C.NextGenerator = NextGenerator;
})();

