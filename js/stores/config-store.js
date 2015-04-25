(function() {
  'use strict';

  var ConfigStore = $.extend({
    _config: null,
    _modeValues: [
      'simu',
      'replay'
    ],

    storeConfig: function(action) {
      this._config = action.config;
      this.emit(C.Constants.Event.Change);
    },

    config: function() {
      return this._config;
    },

    keyConfig: function(mode) {
      var modeName = this._modeValues[mode];

      if (this._config && (modeName in this._config.key)) {
        return this._reverseKeyValue(this._config.key[modeName]);
      } else {
        return null;
      }
    },

    _reverseKeyValue: function(obj) {
      var valueKey = {}
        , key;

      // バージョンの変わり目でキー重複も考えられるが
      // その場合は片方だけ有効になる
      for (key in obj) {
        valueKey[obj[key]] = key;
      }

      return valueKey;
    },

    defaultConfig: function(version) {
      return {
        version: C.Constants.ConfigVersion,

        key: {
          simu: {
            'hardDrop': 'up',
            'leftMove': 'left',
            'softDrop': 'down',
            'rightMove': 'right',
            'turnLeft': 'z',
            'turnRight': 'x',
            'hold': 'c',
            'retry': 'r',
            'superRetry': 'shift + r',
            'back': 'b',
            'forward': 'shift + b',
            'createUrlParameters': 'u',
            'changeModeToReplay': 'num_1',
            'configure': '?'
          },

          replay: {
            'forward': 'right',
            'back': 'left',
            'backToHead': 'r',
            'createUrlParameters': 'u',
            'changeModeToSimu': 'num_1',
            'configure': '?'
          }
        }
      };
    },

    cancel: function(action) {
      this.emit(C.Constants.Event.Cancel);
    },

    addChangeListener: function(callback) {
      this.addListener(C.Constants.Event.Change, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(C.Constants.Event.Change, callback);
    },

    addCancelListener: function(callback) {
      this.addListener(C.Constants.Event.Cancel, callback);
    },

    removeCancelListener: function(callback) {
      this.removeListener(C.Constants.Event.Cancel, callback);
    }
  }, C.StoreBase);

  C.AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case C.Constants.Action.Config.StoreConfig:
        ConfigStore.storeConfig(action);
        break;
      case C.Constants.Action.Config.CancelConfig:
        ConfigStore.cancel(action);
        break;
    }

    return true;
  });

  C.ConfigStore = ConfigStore;
})();

