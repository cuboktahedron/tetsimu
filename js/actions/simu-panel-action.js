(function() {
  'use strict';

  var SimuPanelAction = {
    initialize: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Initialize,
        context: context
      });
    },
  };

  C.SimuPanelAction = SimuPanelAction;
})();

