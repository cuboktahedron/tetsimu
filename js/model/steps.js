(function() {
  'use strict';

  var Steps = function() {
    this._p = -1;
    this._steps = [];
  };

  Steps.GroupMaxBit = 52; // javascriptで問題なく扱える整数の最大値は53bit未満

  Steps.prototype = {
    pushTetrimino: function(tetrimino, spinType, canHardDrop) {
      this._steps.push(this._makeTetriminoStep(tetrimino, spinType, canHardDrop));
    },

    _makeTetriminoStep: function(tetrimino, spinType, canHardDrop) {
      var step
        , isTSpin = false;

      if (spinType === C.Constants.SpinType.TSpin || spinType === C.Constants.SpinType.TSpinMini) {
        isTSpin = true;
      }

      // ハードドロップ可能な条件の場合でもTSpinの場合はソフトドロップとする
      if (canHardDrop && !isTSpin) {
        return new C.Step({
          stepType: C.Constants.StepType.HardDrop,
          pos: tetrimino.pivot().x,
          direction: tetrimino.direction(),
        });
      } else {
        return new C.Step({
          stepType: C.Constants.StepType.SoftDrop,
          pivot: tetrimino.pivot(),
          direction: tetrimino.direction(),
          isTSpin: isTSpin
        });
      }
    },

    pushHold: function() {
      this._steps.push(this._makeHoldStep());
    },

    _makeHoldStep: function(type) {
      return new C.Step({
        stepType: C.Constants.StepType.Hold,
      });
    },

    steps: function() {
      return this._steps;
    },

    length: function() {
      return this._steps.length;
    },

    serialize: function() {
      var i, len
        , steps = this.steps()
        , step
        , value4Step
        , totalBit = 0
        , value = 0
        , result = ''
        , radixConverter = new C.RadixConverter(64);

      len = this._steps.length;
      if (len === 0) {
        return '';
      }

      for (i = 0; i < len; i++) {
        step = this._steps[i];

        if (step.stepType === C.Constants.StepType.Hold) {
          value4Step = this._serialize4Hold();
        } else if (step.stepType === C.Constants.StepType.Ojama) {
          throw new Error('not implemented stepType(' + step.stepType + ')');
        } else if (step.stepType === C.Constants.StepType.HardDrop){
          value4Step = this._serialize4HardDrop(step);
        } else if (step.stepType === C.Constants.StepType.SoftDrop) {
          value4Step = this._serialize4SoftDrop(step);
        } else {
          throw new Error('invalid stepType(' + step.stepType + ')');
        }

        if (totalBit + value4Step.bitNum > Steps.GroupMaxBit) {
          // Steps.GroupMaxBitのbit数に足りない分は0を埋める
          value = this._shiftBit(value, (Steps.GroupMaxBit - totalBit));

          result += radixConverter.convertFromDecimal(value);
          value = value4Step.value;
          totalBit = value4Step.bitNum;
        } else {
          value = this._shiftBit(value, value4Step.bitNum);
          value += value4Step.value;
          totalBit += value4Step.bitNum;
        }
      }

      // 残ったグループを処理
      value = this._shiftBit(value, (Steps.GroupMaxBit - totalBit));
      result += radixConverter.convertFromDecimal(value);

      return result;
    },

    _shiftBit: function(value, shiftNum) {
      // bit演算は32bitまでしか使用できないので自力でbitシフトさせる
      if (shiftNum >= 0) {
        while (shiftNum > 0) {
          value *= 2;
          shiftNum--;
        }
      } else {
        while (shiftNum < 0) {
          value /= 2;
          shiftNum++
        }
      }

      return value;
    },

    _serialize4Hold: function() {
      return {
        bitNum: 4,
        value: Number(C.Constants.StepType.Hold)
      };
    },

    _serialize4HardDrop: function(step) {
      var bitNum
        , value
        , directionValue;

      switch (step.direction) {
        case C.Direction.Up   : directionValue = 0; break;
        case C.Direction.Left : directionValue = 1; break;
        case C.Direction.Down : directionValue = 2; break;
        case C.Direction.Right: directionValue = 3; break;
      }

      bitNum = 10;

      // ステップ種別
      value = Number(step.stepType);

      // 横位置
      // +1するのは、右向きのIミノの場合負値をとることがあり都合が悪いため
      value <<= 4;
      value += (step.pos + 1);

      // 向き
      value <<= 2;
      value += directionValue;

      return {
        bitNum: bitNum,
        value: value
      };
    },

    _serialize4SoftDrop: function(step) {
      var bitNum
        , value
        , directionValue;

      switch (step.direction) {
        case C.Direction.Up   : directionValue = 0; break;
        case C.Direction.Left : directionValue = 1; break;
        case C.Direction.Down : directionValue = 2; break;
        case C.Direction.Right: directionValue = 3; break;
      }

      // ステップ種別
      value = Number(step.stepType);

      bitNum = 15;

      // 座標
      // Xを+1するのは、右向きのIミノの場合負値をとることがあり都合が悪いため
      value <<= 8;
      value += (step.pivot.y * C.Field.DEFAULT_WIDTH + step.pivot.x + 1);

      // 向き
      value <<= 2;
      value += directionValue;

      // 向き
      value <<= 1;
      value += step.isTSpin ? 1 : 0;

      return {
        bitNum: bitNum,
        value: value
      };
    },

    deserialize: function(param) {
      var i, len
        , value
        , radixConverter = new C.RadixConverter(64)
        , restBit
        , stepType
        , step
        , steps = [];

      while (param.length > 0) {
        value = radixConverter.convertToDecimal(param.substring(0, 9));
        param = param.substring(9);
        restBit = 52;

        while(restBit > 0) {
          stepType = String(this._shiftBit(value, -(restBit - 4)) & 0xF);
          if (stepType === C.Constants.StepType.Hold) {
            step = this._deserialize4Hold();
            restBit -= 4;
          } else if (stepType === C.Constants.StepType.Ojama) {
            throw new Error('not implemented stepType(' + stepType + ')');
          } else if (stepType === C.Constants.StepType.HardDrop) {
            step = this._deserialize4HardDrop(value, restBit);
            restBit -= 10;
          } else if (stepType === C.Constants.StepType.SoftDrop) {
            step = this._deserialize4SoftDrop(value, restBit);
            restBit -= 15;
          } else if (stepType === C.Constants.StepType.None) {
            break;
          } else {
            throw new Error('invalid stepType(' + stepType + ')');
          }

          steps.push(step);
        }
      }

      this._steps = steps;
    },

    _deserialize4Hold: function() {
      return {
        stepType: C.Constants.StepType.Hold,
      };
    },

    _deserialize4HardDrop: function(value, restBit) {
      var shiftedValue = this._shiftBit(value, -(restBit - 10)) & 0x3FF
        , stepType
        , pos
        , directionValue
        , directions = [ C.Direction.Up, C.Direction.Left, C.Direction.Down, C.Direction.Right ];

      // ここまでビット数が確定するので、対象となるビット列を取り出す
      stepType = C.Constants.StepType.HardDrop;
      pos = ((shiftedValue >> 2) & 0xF) - 1;
      directionValue = shiftedValue & 0x3

      return {
        stepType: stepType,
        pos: pos,
        direction: directions[directionValue]
      };
    },

    _deserialize4SoftDrop: function(value, restBit) {
        var shiftedValue = this._shiftBit(value, -(restBit - 15)) & 0x7FF
        , stepType
        , pos
        , directionValue
        , directions = [ C.Direction.Up, C.Direction.Left, C.Direction.Down, C.Direction.Right ]
        , isTSpin;

      stepType = C.Constants.StepType.SoftDrop;
      pos = ((shiftedValue >> 3) & 0xFF) -1;
      directionValue = (shiftedValue >> 1) & 0x3
      isTSpin = (shiftedValue & 0x1) == 1;

      return {
        stepType: stepType,
        pivot: { x: pos % C.Field.DEFAULT_WIDTH, y: Math.floor(pos / C.Field.DEFAULT_WIDTH) },
        direction: directions[directionValue],
        isTSpin: isTSpin
      };
    },

    forward: function() {
      var length = this.length();
      if (this._p === length) {
        return null;
      } else if (this._p === length - 1) {
        ++this._p;
        return null;
      } else {
        return this._steps[++this._p];
      }
    },

    back: function() {
      if (this._p < 0) {
        return null;
      } else if (this._p === 0) {
        --this._p;
        return null;
      } else {
        return this._steps[--this._p];
      }
    },

    forgetAfter: function() {
      this._steps.length = (this._p + 1);
    }
  };

  C.Steps = Steps;
})();

(function() {
  'use strict';

  var Step = function(data) {
    var p;
    for (p in data) {
      this[p] = data[p];
    }
  };

  C.Step = Step;
})();

