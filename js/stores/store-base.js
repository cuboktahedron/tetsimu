(function() {
  'use strict';

  var StoreBase = $.extend({
    addListener: function(eventType, callback) {
      this.on(eventType, callback);
    },

    removeListener: function(eventType, callback) {
      this.removeListener(eventType, callback);
    },
  }, EventEmitter.prototype);

  C.StoreBase = StoreBase;
})();

