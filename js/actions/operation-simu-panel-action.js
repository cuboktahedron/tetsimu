(function() {
  'use strict';

  var OperationSimuPanelAction = {
    hardDrop: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.HardDrop
      });
    },

    softDrop: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.SoftDrop
      });
    },

    leftMove: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Move,
        sign: -1
      });
    },

    rightMove: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Move,
        sign: 1
      });
    },

    hold: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Hold
      });
    },

    turnRight: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.TurnRight
      });
    },

    turnLeft: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.TurnLeft
      });
    },

    retry: function(context, isSuperRetry) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Retry,
        context: context,
        isSuperRetry: isSuperRetry
      });
    },

    back: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Back
      });
    },

    forward: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Forward
      });
    },

    clear: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Clear
      });
    },

    createUrlParameters: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.CreateUrlParameters
      });
    },

    changeModeToEdit: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.ChangeModeToEdit,
        context: context
      });
    },

    changeModeToReplay: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.ChangeModeToReplay,
        context: context
      });
    }
  };

  C.OperationSimuPanelAction = OperationSimuPanelAction;
})();

