(function() {
  'use strict';

  var NextEditAction = {
    back: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.BackNext,
      })
    },

    forward: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.ForwardNext,
      })
    },

    setNext: function(index) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.SetNext,
        index: index
      })
    }
  };

  C.NextEditAction = NextEditAction;
})();


