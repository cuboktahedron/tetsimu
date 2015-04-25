(function() {
  'use strict';

  var Dispatcher = function() {
    this._id = 0;
    this._callbacks = {};
  };

  Dispatcher.prototype = {
    _ID_PREFIX: 'id_',

    register: function(callback) {
      var id = this._ID_PREFIX + (this._id++);
      this._callbacks[id] = callback;
      return id;
    },

    unregister: function(id) {
      delete this._callbacks[id];
    },

    dispatch: function(payload) {
      var id;
      for (id in this._callbacks) {
        this._callbacks[id](payload);
      }
    }
  };

  C.Dispatcher = Dispatcher;
})();

