(function() {
  'use strict';

  var Description = function() {
    this.current({
      ren: 0,
      clearLineNum: 0,
      spinType: C.Constants.SpinType.None,
      prevTrick: C.Constants.Trick.None
    });
  };

  Description.prototype = {
    // TODO: getter/setterを作るUtil関数を作る
    ren: function(ren) {
      if (ren === undefined) {
        // get
        return this._ren;
      } else {
        // set
        this._ren = ren;
      }
    },

    clearLineNum: function(num) {
      if (num === undefined) {
        // get
        return this._clearLineNum;
      } else {
        // set
        this._clearLineNum = num;
      }
    },

    spinType: function(type) {
      if (type === undefined) {
        // get
        return this._spinType;
      } else {
        // set
        this._spinType = type;
      }
    },

    fixData: function() {
      var data = {}
        , spinType = this.spinType()
        , line = this.clearLineNum()
        , SpinType = C.Constants.SpinType;

      data.ren = this.ren();

      switch (true) {
        case line === 0 && spinType === SpinType.TSpin:
          data.trick = C.Constants.Trick.TS;
          break;
        case line === 0 && spinType === SpinType.TSpinMini:
          data.trick = C.Constants.Trick.TSM;
          break;
        case line === 0:
          data.trick = C.Constants.Trick.None;
          break;
        case line === 1 && spinType === SpinType.None:
          data.trick = C.Constants.Trick.Single;
          break;
        case line === 1 && spinType === SpinType.TSpin:
          data.trick = C.Constants.Trick.TSS;
          break;
        case line === 1 && spinType === SpinType.TSpinMini:
          data.trick = C.Constants.Trick.TSSM;
          break;
        case line === 2 && (spinType === SpinType.None):
          data.trick = C.Constants.Trick.Double;
          break;
        case line === 2 && (spinType === SpinType.TSpinMini || spinType === SpinType.TSpin):
          data.trick = C.Constants.Trick.TSD;
          break;
        case line === 3 && (spinType === SpinType.None):
          data.trick = C.Constants.Trick.Triple;
          break;
        case line === 3 && (spinType === SpinType.TSpinMini || spinType === SpinType.TSpin):
          data.trick = C.Constants.Trick.TST;
          break;
        case line === 4:
          data.trick = C.Constants.Trick.Tetris;
          break;
      }

      if (this.data()) {
        data.b2b = this._isB2b(data.trick);
      } else {
        data.b2b = false;
      }

      if (line > 0) {
        this._prevTrick = data.trick;
      }
      this._data = data;
    },

    _isB2b: function(trick) {
      return this._isB2bTrick(this._prevTrick) && this._isB2bTrick(trick)
    },

    _isB2bTrick: function(trick) {
      return trick === C.Constants.Trick.Tetris
        || trick === C.Constants.Trick.TSSM
        || trick === C.Constants.Trick.TSS
        || trick === C.Constants.Trick.TSD
        || trick === C.Constants.Trick.TST;
    },

    current: function(value) {
      if (value === undefined) {
        // get
        return {
          ren: this._ren,
          clearLineNum: this._clearLineNum,
          spinType: this._spinType,
          prevTrick: this._prevTrick
        };
      } else {
        // set
        this._ren = value.ren;
        this._clearLineNum = value.clearLineNum;
        this._spinType = value.spinType;
        this._prevTrick = value.prevTrick;

        this.fixData();
      }
    },

    data: function() {
      return $.extend({}, this._data);
    }
  };

  C.Description = Description;
})();

