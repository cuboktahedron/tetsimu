(function() {
  'use strict';

  var FieldEditAction = {
    setCell: function(x, y, type) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SetCell,
        x: x,
        y: y,
        type: type
      })
    }
  };

  C.FieldEditAction = FieldEditAction;
})();


