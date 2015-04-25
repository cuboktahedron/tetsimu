(function() {
  'use strict';

  var ControllerAction = {
    keydown: function(keyName) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Controller.KeyDown,
        keyName: keyName
      })
    },

    keyup: function(keyName) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Controller.KeyUp,
        keyName: keyName
      })
    },
  };

  C.ControllerAction = ControllerAction;
})();

