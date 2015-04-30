(function() {
  'use strict';

  var FieldEditAction = {
    beginEdit: function(x, y) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.BeginSetCell,
        x: x,
        y: y,
      })
    },

    setCell: function(x, y) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SetCell,
        x: x,
        y: y,
      })
    },

    endEdit: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.EndSetCell,
      })
    },

  };

  C.FieldEditAction = FieldEditAction;
})();


