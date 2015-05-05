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

    nextUp: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.BackNext,
      });
    },

    nextDown: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.ForwardNext,
      });
    },

    selectType: function(type) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SelectType,
        type: type
      });
    },

    setHold: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SetHold,
      });
    },
  };

  C.OperationEditPanelAction = OperationEditPanelAction;
})();

