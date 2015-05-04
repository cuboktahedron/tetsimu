(function() {
  'use strict';

  var NextEditAction = {
    back: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.BackNext,
      })
    },

    deleteNext: function(index) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.DeleteNext,
        index: index,
      })
    },

    forward: function() {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.ForwardNext,
      })
    },

    insertNext: function(index) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Edit.InsertNext,
        index: index,
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


