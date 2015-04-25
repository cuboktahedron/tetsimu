(function() {
  'use strict';

  var Histories = function(options) {
    options = $.extend({}, {
      maxHistoryNum: Histories.DEFAULT_MAX_HISTORY_NUM
    }, options);

    this._histories = [];
    this._p = -1;
    this._maxHistoryNum = options.maxHistoryNum;
  };

  Histories.DEFAULT_MAX_HISTORY_NUM = 1000;

  Histories.prototype = {
    push: function(current, field, nexts, hold, description) {
      var c = current == null ? C.CellType.None : current.type()
        , f = field.serialize()
        , ns = nexts.no()
        , h = hold.serialize()
        , d = description.current()
        , history = new C.History(c, f, ns, h, d)

      // back後に追加する際は以前の履歴を削除する
      this._histories.length = (this._p + 1);

      this._push(c, f, ns, h, d);
    },

    _push: function (current, field, nextNo, hold, description) {
      this._histories.push(new C.History(current, field, nextNo, hold, description));
      if (this._p + 1 === this._maxHistoryNum) {
        this._histories.shift();
      } else {
        this._p++;
      }
    },

    length: function() {
      return this._histories.length;
    },

    canBack: function() {
      return this._p > 0;
    },

    back: function() {
      if (this.canBack()) {
        this._p--;
      }
    },

    canForward: function() {
      return this._p < this.length() - 1
    },

    forward: function() {
      if (this.canForward()) {
        this._p++;
      }
    },

    current: function() {
      return this._histories[this._p];
    }
  };

  C.Histories = Histories;
})();

(function() {
  'use strict';

  var sequence = (function() {
    var id = 0;
    return function() {
      return ++id;
    }
  });

  var History = function(current, field, nextNo, hold, description) {
    this._id = sequence();
    this._current = current;
    this._field = field;
    this._nextNo = nextNo;
    this._hold = hold;
    this._description = description;
  };

  History.prototype = {
    id: function() {
      return this._id;
    },

    current: function() {
      return this._current;
    },

    field: function() {
      return this._field;
    },

    nextNo: function() {
      return this._nextNo;
    },

    hold: function() {
      return this._hold;
    },

    description: function() {
      return $.extend({}, this._description);
    },
  };

  C.History = History;
})();

