(function() {
  'use strict';

  var Nexts = function() {
    this._p = -1;
    this._types = [];
    this._typesFixed = [];
  };

  Nexts.prototype = {
    push: function(type) {
      this._types.push(type);
    },

    no: function(v) {
      if (v === undefined) {
        // get
        return this._p;
      } else {
        // set
        this._p = v;
      }
    },

    next: function() {
      this._p++;
      return this._types[this._p];
    },

    types: function(v) {
      if (v === undefined) {
        // get
        return this._types.concat();
      } else {
        // set
        this._types = v.concat();
        this._p = -1;
      }
    },

    setAndComplementTypes: function(types, prevTypes, generator) {
      var complementedTypes = []
        , mergeTypes = prevTypes.concat(types)
        , removeTypes
        , type
        , i, len
        , nextTypesSet

      this._typesFixed = types.map(function(type) {
        return type !== C.CellType.None;
      });

      while((nextTypesSet = this._nextTypesSet(mergeTypes)).length > 0) {
        generator.reset();
        removeTypes = nextTypesSet.filter(function(type) {
          return type !== C.CellType.None;
        });
        generator.removeTypes(removeTypes);

        for (i = 0, len = nextTypesSet.length; i < len; i++) {
          type = nextTypesSet[i];
          if (type === C.CellType.None) {
            type = generator.next();
          }

          complementedTypes.push(type);
        }

        mergeTypes = mergeTypes.slice(nextTypesSet.length);
      }

      this.types(complementedTypes.slice(prevTypes.length));
    },

    _nextTypesSet: function(types) {
      var i
        , len = types.length
        , type
        , typeSet = {};

      if (len > 7) {
        len = 7;
      }

      for (i = 0; i < len; i++) {
        type = types[i];
        if ((type in typeSet) && type !== C.CellType.None) {
          return types.slice(0, i);
        }
        typeSet[type] = true;
      }

      return types.slice(0, 7);
    },

    nextTypes: function() {
      var types = this._types.concat();
      types.splice(0, this._p + 1);
      return types;
    },

    nextTypesFixed: function() {
      var typesFixed = this._typesFixed.concat();
      typesFixed.splice(0, this._p + 1);
      return typesFixed;
    },

    length: function() {
      return this._types.length;
    },

    nextsLength: function() {
      return this._types.length - (this._p + 1);
    },

    serialize: function() {
      return C.NextsSerializer.serialize(this.nextTypes());
    },

    deserialize: function(param) {
      var types = C.NextsDeserializer.deserialize(param);

      this._p = -1;
      this.types(types);
    }
  };

  C.Nexts = Nexts;
})();

