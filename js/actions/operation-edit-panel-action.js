(function() {
  'use strict';

  var OperationEditPanelAction = {
    changeModeToSimu: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.ChangeModeToSimu,
        context: context
      });
    },

    clear: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.Clear
      });
    },

    createUrlParameters: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.CreateUrlParameters,
        context: context
      });
    },
  };

  C.OperationEditPanelAction = OperationEditPanelAction;
})();
