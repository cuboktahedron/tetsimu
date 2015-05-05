(function() {
  'use strict';

  var ReplayStore = $.extend({
    _current: null,
    _context: null,
    _ghost: null,
    _field: new C.Field(),
    _hold: new C.Hold(),
    _histories: new C.Histories(),
    _nexts: new C.Nexts(),
    _nextsVisibled: [],
    _description: new C.Description(),
    _steps: new C.Steps(),
    _currentStep: null,
    _urlParameters: '',

    initialize: function(action) {
      this._context = action.context

      this._current = null;
      this._ghost = null;
      this._field = new C.Field();
      this._hold = new C.Hold();
      this._histories = new C.Histories();
      this._nexts = new C.Nexts();
      this._nextsVisibled= [true, true, true, true, true];
      this._description = new C.Description();
      this._steps = new C.Steps();
      this.__currentStep = null;
      this._urlParameters = '';

      this._init(this._context);
      this.emit(C.Constants.Event.Change);
    },

    _init: function(context) {
      var steps
        , step
        , nexts;

      this._hold.deserialize(context.hold);
      this._nexts.deserialize(context.nexts);
      this._steps.deserialize(context.steps);
      this._field.deserialize(context.field);

      this._currentStep = this._steps.forward();
      if (this._forwardCurrent()) {
        this._updateGhost();
        this._histories.push(this._current, this._field, this._nexts, this._hold, this._description);
      }
    },

    fieldTypes: function() {
      return this._field.innerTypes();
    },

    holdType: function() {
      return this._hold.type();
    },

    nexts: function() {
      return this._nexts.nextTypes();
    },

    nextsVisibled: function() {
      return this._nextsVisibled.concat();
    },

    current: function() {
      return this._current;
    },

    ghost: function() {
      return this._ghost;
    },

    canHold: function() {
      return this._hold.canExchange();
    },

    descriptionData: function() {
      return this._description.data();
    },

    urlParameters: function() {
      return this._urlParameters;
    },

    _forwardCurrent: function() {
      if (this._nexts.length() === 0) {
        this._current = null;
        return false;
      } else {
        this._current = C.TetriminoFactory.create(this._nexts.next(), this._field.startPivot());
        return true;
      }
    },

    settle: function() {
      var clearLineNum
        , spinType = C.Constants.SpinType.None;

      if (this._currentStep.isTSpin) {
        if (this._ghost.canTSpin(this._field)) {
          spinType = C.Constants.SpinType.TSpin;
        } else {
          spinType = C.Constants.SpinType.TSpinMini;
        }
      }

      this._field.settle(this._ghost);
      var clearLineNum = this._field.clearLine()
      this._description.clearLineNum(clearLineNum);
      this._description.spinType(spinType);

      if (clearLineNum > 0) {
        this._description.ren(this._description.ren() + 1);
      } else {
        this._description.ren(0);
      }

      this._hold.release();
      this._forwardCurrent();
      this._histories.push(this._current, this._field, this._nexts, this._hold, this._description);

      this._description.fixData();
    },

    hold: function() {
      var current;

      current = this._hold.exchange(this._current.type());
      if (current == C.CellType.None) {
        this._forwardCurrent();
      } else {
        this._current = C.TetriminoFactory.create(current, this._field.startPivot());
      }
      this._histories.push(this._current, this._field, this._nexts, this._hold, this._description);

      this._description.spinType(C.Constants.SpinType.None);
    },

    back: function(action) {
      var history;

      if (!this._histories.canBack()) {
        return;
      }

      this._histories.back();
      this._currentStep = this._steps.back();
      history = this._histories.current();

      this._current = C.TetriminoFactory.create(history.current(), this._field.startPivot());
      this._field.deserialize(history.field());
      this._nexts.no(history.nextNo());
      this._hold.deserialize(history.hold());
      this._description.current(history.description());

      this._updateGhost();
      this.emit(C.Constants.Event.Change);
    },

    _updateGhost: function() {
      var pivot;
      if (this._currentStep == null) {
        this._ghost = null;
        return;
      }

      this._ghost = this._current.copy();
      if (this._currentStep.stepType === C.Constants.StepType.Hold) {
        this._ghost = null;
      } else if (this._currentStep.stepType === C.Constants.StepType.Ojama) {
        throw new Error('not implemented');
      } else if (this._currentStep.stepType === C.Constants.StepType.HardDrop) {
        pivot = this._ghost.pivot();
        pivot.x = this._currentStep.pos;
        this._ghost.pivot(pivot);
        this._ghost.direction(this._currentStep.direction);
        this._ghost.hardDrop(this._field);
      } else {
        this._ghost.pivot(this._currentStep.pivot);
        this._ghost.direction(this._currentStep.direction);
      }
    },

    forward: function(action) {
      if (this._currentStep == null) {
        return;
      }

      if (this._currentStep.stepType === C.Constants.StepType.Hold) {
        this.hold();
      } else if (this._currentStep.stepType === C.Constants.StepType.Ojama) {
        throw new Error('not implemented');
      } else {
        this.settle();
      }

      this._currentStep = this._steps.forward();
      this._updateGhost();

      this.emit(C.Constants.Event.Change);
    },

    backToHead: function(action) {
      this.initialize({ context: this._context });
    },

    createUrlParameters: function(action) {
      var context = this._context
        , parameters = []
        , f = context.field
        , ns = context.nexts
        , ss = context.steps
        , h = context.hold;

      if (!!f) {
        parameters.push('f=' + f);
      }

      if (!!ns) {
        parameters.push('ns=' + ns);
      }

      if (!!ss) {
        parameters.push('ss=' + ss);
      }

      if (!!h) {
        parameters.push('h=' + h);
      }

      parameters.push('m=' + C.Constants.Mode.Replay);
      parameters.push('v=' + C.Constants.Version);

      this._urlParameters = parameters.join('&');
      this.emit(C.Constants.Event.SetUrl);
    },

    changeModeToSimu: function(action) {
      var mode = C.Constants.Mode.Simu
        , context = this._context;

      // リプレイモード→プレイングモード切替時は、前回切替前の続きから再開
      // させるが、リプレイモードから開始している場合もあるので、その場合は
      // リプレイモードの初期状態を引き継ぐ
      var params = {
        field: context.field,
        nexts: context.nexts,
        prevs: context.prevs,
        hold: context.hold
      };
      this.emit(C.Constants.Event.ChangeMode, mode, params);
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
      case C.Constants.Action.Replay.Initialize:
        ReplayStore.initialize(action);
        break;
      case C.Constants.Action.Replay.Forward:
        ReplayStore.forward(action);
        break;
      case C.Constants.Action.Replay.Back:
        ReplayStore.back(action);
        break;
      case C.Constants.Action.Replay.BackToHead:
        ReplayStore.backToHead(action);
        break;
      case C.Constants.Action.Replay.CreateUrlParameters:
        ReplayStore.createUrlParameters(action);
        break;
      case C.Constants.Action.Replay.ChangeModeToSimu:
        ReplayStore.changeModeToSimu(action);
        break;
    }

    return true;
  });

  C.ReplayStore = ReplayStore;
})();

