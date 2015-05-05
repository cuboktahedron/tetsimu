(function() {
  'use strict';

  var NextItemAction = {
    toggleNextVisible: function(index) {
      C.AppDispatcher.handleViewAction({
        actionType: C.Constants.Action.Share.ToggleNextVisible,
        index: index,
      })
    },
  };

  C.NextItemAction = NextItemAction;
})();


