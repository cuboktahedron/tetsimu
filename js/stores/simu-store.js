(function() {
  'use strict';

  var SimuStore = $.extend({
    _initialized: false,
    _context: null,
    _current: null,
    _ghost: null,
    _field: new C.Field(),
    _hold: new C.Hold(),
    _histories: new C.Histories(),
    _nexts: new C.Nexts(),
    _nextsVisibled: [],
    _description: new C.Description(),
    _nextGenerator: new C.NextGenerator(),
    _steps: new C.Steps(),
    _seed: 0,
    _urlParameters: '',

    initialize: function(action, force) {
      if (this._initialized && !action.context.force) {
        this._context.before = action.context.before;
        return;
      }

      this._initialized = true;
      this._context = action.context
      this._seed = this._context.seed == null ? C.Random.nextInt(1000000) : this._context.seed;
      this._nextsVisibled= [true, true, true, true, true];

      this._init(action.context);
      this.emit(C.Constants.Event.Change);
    },

    _init: function(context) {
      var prevs;

      this._current = null,
      this._ghost = null,
      this._field = new C.Field(),
      this._hold = new C.Hold(),
      this._histories = new C.Histories(),
      this._nexts = new C.Nexts(),
      this._description = new C.Description(),
      this._nextGenerator = new C.NextGenerator(),
      this._steps = new C.Steps(),
      this._currentStep = null;

      C.Random.setSeed(this._seed);

      this._hold.deserialize(context.hold);
      this._field.deserialize(context.field);
      this._nexts.deserialize(context.nexts);

      prevs = C.NextsDeserializer.deserialize(context.prevs);
      this._nexts.setAndComplementTypes(this._nexts.types(), prevs, this._nextGenerator);
      while (this._nexts.nextsLength() < 5) {
        this._nexts.push(this._nextGenerator.next());
      }

      this._forwardCurrent();

      this._histories.push(this._current, this._field, this._nexts, this._hold, this._description);
    },

    context: function() {
      return this._context;
    },

    retry: function(action) {
      if (action.isSuperRetry) {
        this._seed = C.Random.nextInt(1000000);
      }

      this._init(this._context);
      this.emit(C.Constants.Event.Change);
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

    nextsFixed: function() {
      return this._nexts.nextTypesFixed();
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

    seed: function() {
      return this._seed;
    },

    urlParameters: function() {
      return this._urlParameters;
    },

    _forwardCurrent: function() {
      this._current = C.TetriminoFactory.create(this._nexts.next(), this._field.startPivot());
      if (this._nexts.nextsLength() < 5) {
        this._nexts.push(this._nextGenerator.next());
      }

      this._updateGhost();
    },

    hardDrop: function(action) {
      var clearLineNum
        , prevPivotY = this._current.pivot().y
        , canHardDropFromStart;

      this._current.hardDrop(this._field);
      canHardDropFromStart = this._canHardDropFromStart(this._current);
      this._field.settle(this._current);

      if (prevPivotY !== this._current.pivot().y) {
        // 落下があったのでスピン無しに戻す
        this._description.spinType(C.Constants.SpinType.None);
      }

      // 戻っているかもしれないので、その分を忘れてから次の譜を積む
      this._steps.forgetAfter();
      this._steps.pushTetrimino(this._current, this._description.spinType(), canHardDropFromStart);
      this._steps.forward();

      var clearLineNum = this._field.clearLine()
      this._description.clearLineNum(clearLineNum);

      if (clearLineNum > 0) {
        this._description.ren(this._description.ren() + 1);
      } else {
        this._description.ren(0);
      }

      this._forwardCurrent();
      this._hold.release();
      this._histories.push(this._current, this._field, this._nexts, this._hold, this._description);

      this._description.fixData();
      this.emit(C.Constants.Event.Change);
    },

    _canHardDropFromStart: function(current) {
      var testCurrent = current.copy()
        , pivot = testCurrent.pivot()
        , currentPivot = current.pivot()
        , hardDropPivot;

      // 開始Y座標からハードドロップでcurrentの座標に落とせるかどうかを判定する
      pivot.y = this._field.startPivot().y;
      testCurrent.pivot(pivot);
      testCurrent.hardDrop(this._field);
      hardDropPivot = testCurrent.pivot();

      return hardDropPivot.x === currentPivot.x && hardDropPivot.y === currentPivot.y;
    },

    softDrop: function(action) {
      if (!this._field.isGround(this._current)) {
        this._current.move({
          x: 0,
          y: -1
        });

        this._description.spinType(C.Constants.SpinType.None);
      }

      this.emit(C.Constants.Event.Change);
    },

    move: function(action) {
      if (this._current.canMove(this._field, { x: action.sign, y: 0 })) {
        this._current.move({
          x: action.sign,
          y: 0
        });

        this._description.spinType(C.Constants.SpinType.None);
        this._updateGhost();

        this.emit(C.Constants.Event.Change);
      }
    },

    hold: function(action) {
      var current;

      if (!this._hold.canExchange()) {
        return;
      }

      // 戻っているかもしれないので、その分を忘れてから次の譜を積む
      this._steps.forgetAfter();
      this._steps.pushHold(this._current.type());
      this._steps.forward();
      current = this._hold.exchange(this._current.type());
      if (current == C.CellType.None) {
        this._forwardCurrent();
      } else {
        this._current = C.TetriminoFactory.create(current, this._field.startPivot());
      }
      this._histories.push(this._current, this._field, this._nexts, this._hold, this._description);

      this._description.spinType(C.Constants.SpinType.None);
      this._updateGhost();
      this.emit(C.Constants.Event.Change);
    },

    turnLeft: function(action) {
      var specialInfo = {};

      if (this._current.turnLeftIfPossible(this._field, specialInfo)
        || this._current.turnLeftSuperlyIfPossible(this._field, specialInfo)) {

        this._description.spinType(specialInfo.spinType);
        this._updateGhost();
        this.emit(C.Constants.Event.Change);
      }
    },

    turnRight: function(action) {
      var specialInfo = {};

      if (this._current.turnRightIfPossible(this._field, specialInfo)
        || this._current.turnRightSuperlyIfPossible(this._field, specialInfo)) {

        this._description.spinType(specialInfo.spinType);
        this._updateGhost();
        this.emit(C.Constants.Event.Change);
      }
    },

    forward: function(action) {
      var history;

      if (!this._histories.canForward()) {
        return;
      }

      this._histories.forward();
      this._steps.forward();
      history = this._histories.current();

      this._current = C.TetriminoFactory.create(history.current(), this._field.startPivot());
      this._field.deserialize(history.field());
      this._nexts.no(history.nextNo());
      this._hold.deserialize(history.hold());
      this._description.current(history.description());

      this._updateGhost();
      this.emit(C.Constants.Event.Change);
    },

    back: function(action) {
      var history;

      if (!this._histories.canBack()) {
        return;
      }

      this._histories.back();
      this._steps.back();
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
      this._ghost = this._current.copy();
      this._ghost.hardDrop(this._field);
    },

    createUrlParameters: function(action) {
      var context = this._context
        , parameters = []
        , f = context.field
        , ns = this._nexts.serialize()
        , ss = this._steps.serialize()
        , h = context.hold
        , seed = this._seed;

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
      parameters.push('s=' + seed);
      parameters.push('v=' + C.Constants.Version);

      this._urlParameters = parameters.join('&');
      this.emit(C.Constants.Event.SetUrl);
    },

    changeModeToEdit: function(action) {
      var mode = C.Constants.Mode.Edit
        , nexts = new C.Nexts()
        , nextTypes = this.nexts();

      nextTypes.unshift(this._current.type());
      nexts.types(nextTypes);

      var params = {
        before: C.Constants.Mode.Simu,
        field: this._field.serialize(),
        force: true,
        hold: this._hold.serialize(),
        nexts: nexts.serialize(),
        prevs: '',
      };
      this.emit(C.Constants.Event.ChangeMode, mode, params);
    },

    backToEditMode: function(action) {
      var mode = C.Constants.Mode.Edit
      this.emit(C.Constants.Event.ChangeMode, mode, {
        before: C.Constants.Mode.Simu
      });
    },

    changeModeToReplay: function(action) {
      var mode = C.Constants.Mode.Replay
        , allNextsTypes = this._nexts.types()
        , allNexts = new C.Nexts();

      allNexts.types(allNextsTypes);

      var params = {
        before: C.Constants.Mode.Simu,
        field: this._context.field,
        hold: this._context.hold,
        nexts: allNexts.serialize(),
        prevs: '',
        steps: this._steps.serialize()
      };
      this.emit(C.Constants.Event.ChangeMode, mode, params);
    },

    clear: function(action) {
      var mode = C.Constants.Mode.Simu
        , params = {
        force: true,
        field: '',
        hold: '',
        nexts: '',
        prevs: '',
        steps: ''
      };

      this.emit(C.Constants.Event.ChangeMode, mode, params);
    },

    toggleNextVisible: function(action) {
      this._nextsVisibled[action.index] = !this._nextsVisibled[action.index];
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
      case C.Constants.Action.Simu.Initialize:
        SimuStore.initialize(action);
        break;
      case C.Constants.Action.Simu.HardDrop:
        SimuStore.hardDrop(action);
        break;
      case C.Constants.Action.Simu.SoftDrop:
        SimuStore.softDrop(action);
        break;
      case C.Constants.Action.Simu.Move:
        SimuStore.move(action);
        break;
      case C.Constants.Action.Simu.Hold:
        SimuStore.hold(action);
        break;
      case C.Constants.Action.Simu.TurnRight:
        SimuStore.turnRight(action);
        break;
      case C.Constants.Action.Simu.TurnLeft:
        SimuStore.turnLeft(action);
        break;
      case C.Constants.Action.Simu.Retry:
        SimuStore.retry(action);
        break;
      case C.Constants.Action.Simu.Forward:
        SimuStore.forward(action);
        break;
      case C.Constants.Action.Simu.Back:
        SimuStore.back(action);
        break;
      case C.Constants.Action.Simu.Clear:
        SimuStore.clear(action);
        break;
      case C.Constants.Action.Simu.CreateUrlParameters:
        SimuStore.createUrlParameters(action);
        break;
      case C.Constants.Action.Simu.ChangeModeToEdit:
        SimuStore.changeModeToEdit(action);
        break;
      case C.Constants.Action.Simu.ChangeModeToReplay:
        SimuStore.changeModeToReplay(action);
        break;
      case C.Constants.Action.Simu.BackToEditMode:
        SimuStore.backToEditMode(action);
        break;
      case C.Constants.Action.Share.ToggleNextVisible:
        SimuStore.toggleNextVisible(action);
        break;

      default:
        break;
    }

    return true;
  });

  C.SimuStore = SimuStore;
})();

