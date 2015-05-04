(function() {
  'use strict';

  var OperationEditPanelAction = {
    cancel: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.Cancel
      });
    },

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

    fieldUp: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.BuildUpField,
      });
    },

    fieldDown: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.BuildDownField,
      });
    },

    selectType: function(type) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SelectType,
        type: type
      });
    },
  };

  C.OperationEditPanelAction = OperationEditPanelAction;
})();

