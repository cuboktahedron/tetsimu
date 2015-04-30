(function() {
  'use strict';

  var MouseAction = {
    down: function(e) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Mouse.Down,
        event: e
      });
    },

    up: function(e) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Mouse.Up,
        event: e
      });
    },
  };

  C.MouseAction = MouseAction;
})();

