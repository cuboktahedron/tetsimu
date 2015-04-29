(function() {
  'use strict';

  var HoldEditAction = {
    SetHold: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SetHold
      })
    }
  };

  C.HoldEditAction = HoldEditAction;
})();


