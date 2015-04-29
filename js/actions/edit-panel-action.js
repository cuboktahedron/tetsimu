(function() {
  'use strict';

  var EditPanelAction = {
    initialize: function(context) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.Initialize,
        context: context
      });
    },
  };

  C.EditPanelAction = EditPanelAction;
})();

