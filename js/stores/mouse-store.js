(function() {
  'use strict';

  var MouseStore = $.extend({

    _state: {
      lButtonDown: false,
    },

    state: function() {
      return $.extend(true, {}, this._state);
    },

    addMouseListener: function(callback) {
      this.addListener(C.Constants.Event.Mouse, callback);
    },

    removeMouseListener: function(callback) {
      this.removeListener(C.Constants.Event.Mouse, callback);
    },

    up: function(action) {
      var type = action.event.which;
      if (type === C.Constants.MouseButton.Left) {
        this._state.lButtonDown = false;
        this.emit(C.Constants.Event.Mouse);
      }
    },

    down: function(action) {
      var type = action.event.which;
      if (type === C.Constants.MouseButton.Left) {
        this._state.lButtonDown = true;
        this.emit(C.Constants.Event.Mouse);
      }
    },
  }, C.StoreBase);

  C.AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case C.Constants.Action.Mouse.Up:
        MouseStore.up(action);
        break;
      case C.Constants.Action.Mouse.Down:
        MouseStore.down(action);
        break;
      default:
        break;
    }

    return true;
  });

  C.MouseStore = MouseStore;
})();

