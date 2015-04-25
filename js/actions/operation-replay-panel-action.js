(function() {
  'use strict';

  var OperationReplayPanelAction = {
    forward: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.Forward
      });
    },

    back: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.Back
      });
    },

    backToHead: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.BackToHead,
        context: context
      });
    },

    createUrlParameters: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.CreateUrlParameters,
        context: context
      });
    },

    changeModeToSimu: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.ChangeModeToSimu,
        context: context
      });
    }
  };

  C.OperationReplayPanelAction = OperationReplayPanelAction;
})();

