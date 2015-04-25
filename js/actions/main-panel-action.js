(function() {
  'use strict';

  var MainPanelAction = {
    initialize: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Simu.Initialize,
        context: context
      });
    },

    storeConfig: function(config) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Config.StoreConfig,
        config: config
      });
    }
  };

  C.MainPanelAction = MainPanelAction;
})();

