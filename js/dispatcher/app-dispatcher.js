(function() {
  'use strict';

  var AppDispatcher = function() {
    C.Dispatcher.call(this);
  };

  AppDispatcher.prototype = $.extend({
    handleViewAction: function(action) {
      this.dispatch({
        source: 'VIEW_ACTION',
        action: action
      });
    }
  }, C.Dispatcher.prototype);

  C.AppDispatcher = new AppDispatcher();
})();

