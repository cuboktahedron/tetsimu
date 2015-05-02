(function() {
  'use strict';

  var NextEditAction = {
    setNext: function(index) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SetNext,
        index: index
      })
    }
  };

  C.NextEditAction = NextEditAction;
})();


