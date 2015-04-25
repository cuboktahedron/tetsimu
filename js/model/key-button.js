(function() {
  'use strict';

  var KeyButton = function() {
    this._configure = {
        interval1: 0.1,
        interval2: 0.02
    };
    this._prev = false;
    this._current = false;
    this._intervalDown = false;

    this._prevDate = null;
    this._currentInterval = -1;
  };

  KeyButton.prototype = {
    keyDown: function() {
      var currentDate;

      this._prev = this._current;
      this._current = true;

      if (this._prevDate != null) {
        currentDate = new Date();
        if (currentDate - this._prevDate >= this._currentInterval * 1000) {
          this._prevDate = currentDate;
          this._intervalDown = true;
          this._currentInterval = this._configure.interval2;
        } else {
          this._intervalDown = false;
        }
      } else {
        this._intervalDown = true;
        this._prevDate = new Date();
        this._currentInterval = this._configure.interval1;
      }
    },

    keyUp: function() {
      this._prev = this._current;
      this._current = false;
        this._intervalDown = false;
      this._prevDate = null;
    },

    state: function() {
      return {
        active: this._current,
        down: !this._prev && this._current,
        up: this._prev && !this._current,
        intervalDown: this._intervalDown
      }
    },

    configure: function(option) {
      this._configure = $.extend({
        interval1: 0.3,
        interval2: 0.1
      }, option);
    }
  };

  C.KeyButton = KeyButton;
})();

