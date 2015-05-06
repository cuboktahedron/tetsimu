(function() {
  'use strict';

  var ContextBuilder = {
    build: function(params) {
      var context = {};

      context.initialMode = this._buildInitialMode(params);
      context.field = this._buildField(params);
      context.hold = this._buildHold(params);
      context.nexts = this._buildNexts(params);
      context.nextsVisibled = this._buildNextsVisibled(params);
      context.prevs = this._buildPrevs(params);
      context.steps = this._buildSteps(params);
      context.seed = this._buildSeed(params);

      return context;
    },

    _buildInitialMode: function(params) {
      return params.m == null ? C.Constants.Mode.Simu : params.m;
    },

    _buildField: function(params) {
      return params.f || '';
    },

    _buildHold: function(params) {
      return params.h || '';
    },

    _buildNexts: function(params) {
      return params.ns || '';
    },

    _buildNextsVisibled: function(params) {
      return params.nv || 'v';
    },

    _buildPrevs: function(params) {
      return params.ps || '';
    },

    _buildSteps: function(params) {
      return params.ss || '';
    },

    _buildSeed: function(params) {
      return params.s == null ? null : Number(params.s);
    }
  };

  C.ContextBuilder = ContextBuilder;
})();

