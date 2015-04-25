(function() {
  'use strict';

  var ConfigAction = {
    cancel: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Config.CancelConfig
      });
    },

    save: function(config) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Config.StoreConfig,
        config: config
      });
    }
  };

  C.ConfigAction = ConfigAction;
})();

