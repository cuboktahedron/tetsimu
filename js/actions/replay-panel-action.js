(function() {
  'use strict';

  var ReplayPanelAction = {
    initialize: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.Initialize,
        context: context
      });
    },
  };

  C.ReplayPanelAction = ReplayPanelAction;
})();

