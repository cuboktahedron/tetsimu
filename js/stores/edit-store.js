(function() {
  'use strict';

  var EditStore = $.extend({
    _initialized: false,
    _context: null,
    _field: new C.Field(),
    _hold: new C.Hold(),
    _nextIndex: 0,
    _nexts: new C.Nexts(), _prevs: new C.Nexts(),
    _nextGenerator: new C.NextGenerator(),
    _nextsVisibled: new C.NextsVisibled(),
    _selectedType: C.CellType.I,
    _urlParameters: '',

    initialize: function(action, force) {
      if (this._initialized && !action.context.force) {
        this._context.before = action.context.before;
        return;
      }

      this._initialized = true;
      this._context = action.context;
      this._nextsVisibled.deserialize(this._context.nextsVisibled);

      this._init(action.context);
      this.emit(C.Constants.Event.Change);
    },

    _init: function(context) {
      this._field = new C.Field(),
      this._nextIndex = 0,
      this._hold = new C.Hold(),
      this._nexts = new C.Nexts(),
      this._prevs = new C.Nexts(),
      this._nextGenerator = new C.NextGenerator(),

      this._field.deserialize(context.field);
      this._hold.deserialize(context.hold);
      this._nexts.deserialize(context.nexts);
      this._prevs.deserialize(context.prevs);
    },

    context: function() {
      return this._context;
    },

    fieldTypes: function() {
      return this._field.innerTypes();
    },

    holdType: function() {
      return this._hold.type();
    },

    nexts: function() {
      return {
        prevs: this._prevs.types().slice(0, 6),
        nexts: this._nexts.types(),
        index: 0
      }
    },

    NextIndex: function() {
      return this._nextIndex;
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
        , ns = this._nexts.serialize()
        , nv = this._nextsVisibled.serialize()
        , ps = this._prevs.serialize();

      if (!!f) {
        parameters.push('f=' + f);
      }

      if (!!ns) {
        parameters.push('ns=' + ns);
      }

      if (!!nv && nv != 'v') {
        parameters.push('nv=' + nv);
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
      this.emit(C.Constants.Event.ChangeMode, mode, {
        before: C.Constants.Mode.Edit
      });
    },

    changeModeToSimu: function(action) {
      var mode = C.Constants.Mode.Simu

      var params = {
        before: C.Constants.Mode.Edit,
        field: this._field.serialize(),
        force: true,
        hold: this._hold.serialize(),
        nexts: C.NextsSerializer.serialize(this._nexts.types()),
        nextsVisibled: this._nextsVisibled.serialize(),
        prevs: C.NextsSerializer.serialize(this._prevs.types()),
      };
      this.emit(C.Constants.Event.ChangeMode, mode, params);
    },

    clear: function(action) {
      var mode = C.Constants.Mode.Edit
        , params = {
        force: true,
        field: '',
        hold: '',
        nexts: '',
        nextsVisibled: this._nextsVisibled.serialize(),
        prevs: ''
      };

      this.emit(C.Constants.Event.ChangeMode, mode, params);
    },

    beginSetCell: function(action) {
      this._setCell(action.x, action.y, this._selectedType);
      this.emit(C.Constants.Event.Change);
    },

    setCell: function(action) {
      this._setCell(action.x, action.y, this._selectedType);
      this.emit(C.Constants.Event.Change);
    },

    _setCell: function(x, y, type) {
      this._field.type(x, y, type);
    },

    endSetCell: function(action) {
      this.emit(C.Constants.Event.Change);
    },

    setHold: function(action) {
      var selectedType = this._selectedType;
      if (selectedType === C.CellType.Ojama) {
        selectedType = C.CellType.None;
      }

      if (selectedType === C.CellType.None) {
        this._hold.type(C.CellType.None);
        this._hold.release();
      } else if (this._hold.type() === C.CellType.None) {
        this._hold.type(selectedType);
      } else if (this._hold.type() !== selectedType) {
        this._hold.type(selectedType);
      } else if (this._hold.canExchange()) {
        this._hold.exchange(selectedType);
      } else {
        this._hold.type(C.CellType.None);
        this._hold.release();
      }

      this.emit(C.Constants.Event.Change);
    },

    backNext: function(action) {
      if (this._nextIndex < -5) {
        return;
      }
      this._nextIndex--;
      this.emit(C.Constants.Event.Change);
    },

    forwardNext: function(action) {
      this._nextIndex++;
      this.emit(C.Constants.Event.Change);
    },

    deleteNext: function(action) {
      this._nexts.delete(action.index);
      this.emit(C.Constants.Event.Change);
    },

    insertNext: function(action) {
      this._nexts.insert(action.index, C.CellType.None);
      this.emit(C.Constants.Event.Change);
    },

    setNext: function(action) {
      var selectedType = this._selectedType;
      if (selectedType === C.CellType.Ojama) {
        selectedType = C.CellType.None;
      }

      if (action.index < 0) {
        this._prevs.typeAt(-(action.index + 1), selectedType);
      } else {
        this._nexts.typeAt(action.index, selectedType);
      }

      this.emit(C.Constants.Event.Change);
    },

    buildDownField: function(action) {
      var types = this._field.types();
      types.splice(0, 1);
      types.push(types[0].map(function() {
        return C.CellType.None;
      }));
      this._field.types(types);

      this.emit(C.Constants.Event.Change);
    },

    buildUpField: function(action) {
      var types = this._field.types();
      types.splice(types.length - 1, 1);
      types.unshift(types[0].map(function() {
        return C.CellType.Ojama;
      }));
      this._field.types(types);

      this.emit(C.Constants.Event.Change);
    },

    selectType: function(action) {
      this._selectedType = action.type;
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
      case C.Constants.Action.Edit.BackNext:
        EditStore.backNext(action);
        break;
      case C.Constants.Action.Edit.BeginSetCell:
        EditStore.beginSetCell(action);
        break;
      case C.Constants.Action.Edit.BuildDownField:
        EditStore.buildDownField(action);
        break;
      case C.Constants.Action.Edit.BuildUpField:
        EditStore.buildUpField(action);
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
      case C.Constants.Action.Edit.DeleteNext:
        EditStore.deleteNext(action);
        break;
      case C.Constants.Action.Edit.EndSetCell:
        EditStore.endSetCell(action);
        break;
      case C.Constants.Action.Edit.ForwardNext:
        EditStore.forwardNext(action);
        break;
      case C.Constants.Action.Edit.InsertNext:
        EditStore.insertNext(action);
        break;
      case C.Constants.Action.Edit.SelectType:
        EditStore.selectType(action);
        break;
      case C.Constants.Action.Edit.SetCell:
        EditStore.setCell(action);
        break;
      case C.Constants.Action.Edit.SetHold:
        EditStore.setHold(action);
        break;
      case C.Constants.Action.Edit.SetNext:
        EditStore.setNext(action);
        break;

      default:
        break;
    }

    return true;
  });

  C.EditStore = EditStore;
})();

