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

    backToHead: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.BackToHead,
      });
    },

    createUrlParameters: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.CreateUrlParameters,
      });
    },

    changeModeToSimu: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.ChangeModeToSimu,
      });
    }
  };

  C.OperationReplayPanelAction = OperationReplayPanelAction;
})();

