(function() {
  'use strict';

  var EditStore = $.extend({
    _field: new C.Field(),
    _hold: new C.Hold(),
    _nexts: new C.Nexts(), _prevs: new C.Nexts(),
    _nextGenerator: new C.NextGenerator(),
    _selectedType: C.CellType.T, // TOOD: ここは選択する手段を別途用意する
    _urlParameters: '',

    initialize: function(action, force) {
      var context = action.context

      this._init(action.context);
      this.emit(C.Constants.Event.Change);
    },

    _init: function(context) {
      this._field = new C.Field(),
      this._hold = new C.Hold(),
      this._nexts = new C.Nexts(),
      this._prevs = new C.Nexts(),
      this._nextGenerator = new C.NextGenerator(),

      this._field.deserialize(context.field);
      this._hold.deserialize(context.hold);
      this._nexts.deserialize(context.nexts);
      this._prevs.deserialize(context.prevs);
    },

    fieldTypes: function() {
      return this._field.innerTypes();
    },

    holdType: function() {
      return this._hold.type();
    },

    nexts: function() {
      return {
        prevs: this._prevs.types(),
        nexts: this._nexts.types(),
        index: 0
      }
    },

    canHold: function() {
      return this._hold.canExchange();
    },

    selectedType: function() {
      return this._selectedType;
    },

    urlParameters: function() {
      return this._urlParameters;
    },

    createUrlParameters: function(action) {
      var parameters = []
        , f = this._field.serialize()
        , h = this._hold.serialize()
        , ns = C.NextsSerializer.serialize(this._nexts.types())
        , ps = C.NextsSerializer.serialize(this._prevs.types());

      if (!!f) {
        parameters.push('f=' + f);
      }

      if (!!ns) {
        parameters.push('ns=' + ns);
      }

      if (!!ps) {
        parameters.push('ps=' + ps);
      }

      if (!!h) {
        parameters.push('h=' + h);
      }

      parameters.push('v=' + C.Constants.Version);

      this._urlParameters = parameters.join('&');
      this.emit(C.Constants.Event.SetUrl);
    },

    cancel: function(action) {
      var mode = C.Constants.Mode.Simu
      this.emit(C.Constants.Event.ChangeMode, mode, {});
    },

    changeModeToSimu: function(action) {
      var mode = C.Constants.Mode.Simu

      var params = {
        field: this._field.serialize(),
        force: true,
        hold: this._hold.serialize(),
        nexts: C.NextsSerializer.serialize(this._nexts.types()),
        prevs: C.NextsSerializer.serialize(this._prevs.types()),
      };
      this.emit(C.Constants.Event.ChangeMode, mode, params);
    },

    clear: function(action) {
//      var mode = C.Constants.Mode.Edit
//        , params = {
//        force: true,
//        field: '',
//        hold: '',
//        nexts: '',
//        steps: ''
//      };
//
//      this.emit(C.Constants.Event.ChangeMode, mode, params);
    },

    setCell: function(action) {
      this._field.type(action.x, action.y, action.type);
      this.emit(C.Constants.Event.Change);
    },

    setHold: function(action) {
      if (this._hold.type() === C.CellType.None) {
        this._hold.type(this._selectedType);
      } else if (this._hold.type() !== this._selectedType) {
        this._hold.type(this._selectedType);
      } else if (this._hold.canExchange()) {
        this._hold.exchange(this._selectedType);
      } else {
        this._hold.type(C.CellType.None);
        this._hold.release();
      }

      this.emit(C.Constants.Event.Change);
    },

    addChangeListener: function(callback) {
      this.addListener(C.Constants.Event.Change, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(C.Constants.Event.Change, callback);
    },

    addSetUrlListener: function(callback) {
      this.addListener(C.Constants.Event.SetUrl, callback);
    },

    removeSetUrlListener: function(callback) {
      this.removeListener(C.Constants.Event.SetUrl, callback);
    },

    addChangeModeListener: function(callback) {
      this.addListener(C.Constants.Event.ChangeMode, callback);
    },

    removeChangeModeListener: function(callback) {
      this.removeListener(C.Constants.Event.ChangeMode, callback);
    },
  }, C.StoreBase);

  C.AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case C.Constants.Action.Edit.Initialize:
        EditStore.initialize(action);
        break;
      case C.Constants.Action.Edit.Cancel:
        EditStore.cancel(action);
        break;
      case C.Constants.Action.Edit.Clear:
        EditStore.clear(action);
        break;
      case C.Constants.Action.Edit.CreateUrlParameters:
        EditStore.createUrlParameters(action);
        break;
      case C.Constants.Action.Edit.ChangeModeToSimu:
        EditStore.changeModeToSimu(action);
        break;
      case C.Constants.Action.Edit.SetCell:
        EditStore.setCell(action);
        break;
      case C.Constants.Action.Edit.SetHold:
        EditStore.setHold(action);
        break;

      default:
        break;
    }

    return true;
  });

  C.EditStore = EditStore;
})();

