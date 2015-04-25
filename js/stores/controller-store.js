(function() {
  'use strict';

  var ControllerStore = $.extend({

    _ctrl: false,
    _cmd: false,
    _shift: false,

    _keyButtons: (function() {
        var keys = {}
          , i, len;

        for (i = 0, len = C.Constants.KeyNames.length; i < len; i++) {
          keys[C.Constants.KeyNames[i]] = new C.KeyButton();
        }
        return keys;
      })(),

    addKeyListener: function(callback) {
      this.addListener(C.Constants.Event.Key, callback);
    },

    removeKeyListener: function(callback) {
      this.removeListener(C.Constants.Event.Key, callback);
    },

    keyUp: function(action) {
      var keyButton = this._keyButtons[action.keyName]
        , state;

      this._updateSpecialKeys(action, false);

      keyButton.keyUp();
      state = keyButton.state();
      state.keyName = action.keyName;

      this.emit(C.Constants.Event.Key, state);
    },

    keyDown: function(action) {
      var keyButton = this._keyButtons[action.keyName]
        , state;

      this._updateSpecialKeys(action, true);

      keyButton.keyDown();
      state = keyButton.state();
      state.keyName = this._makeComboKeyName(action.keyName);

      this.emit(C.Constants.Event.Key, state);
    },

    _updateSpecialKeys: function(action, isDown) {
      // 複数ある修飾キーを同時押下した場合、一つのkeyUpで押下状態がクリアされる
      // ことになるがあまり問題にならないので放置する

      switch (action.keyName) {
        case 'shift':
          this._shift = isDown;
          break;
        case 'ctrl':
          this._ctrl = isDown;
          break;
        case 'cmd':
          this._cmd = isDown;
          break;
      }
    },

    _makeComboKeyName: function(keyName) {
      var keys = [];
      if (keyName != 'ctrl' && this._ctrl) {
        keys.push('ctrl');
      }

      if (keyName != 'shift' && this._shift && $.inArray(keyName, C.Constants.ShiftedKeys) === -1) {
        keys.push('shift');
      }

      if (keyName != 'cmd' && this._cmd) {
        keys.push('cmd');
      }

      keys.push(keyName);
      return keys.join(' + ');
    }
  }, C.StoreBase);

  C.AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case C.Constants.Action.Controller.KeyUp:
        ControllerStore.keyUp(action);
        break;
      case C.Constants.Action.Controller.KeyDown:
        ControllerStore.keyDown(action);
        break;
      default:
        break;
    }

    return true;
  });

  C.ControllerStore = ControllerStore;
})();

