(function() {
  'use strict';

  var FieldAction = {
    drawDot: function(type, x, y) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.DrawDot,
        type: type,
        x: x,
        y: y
      })
    }
  };

  C.FieldAction = FieldAction;
})();


