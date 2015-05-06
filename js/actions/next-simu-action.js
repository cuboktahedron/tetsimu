(function() {
  'use strict';

  var NextSimuAction = {
    toggleNextVisible: function(index) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.ToggleNextVisible,
        index: index,
      })
    },
  };

  C.NextSimuAction = NextSimuAction;
})();


