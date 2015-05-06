(function() {
  'use strict';

  var NextReplayAction = {
    toggleNextVisible: function(index) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Replay.ToggleNextVisible,
        index: index,
      })
    },
  };

  C.NextReplayAction = NextReplayAction;
})();


