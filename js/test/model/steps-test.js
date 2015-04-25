(function() {
  var steps;

  module('StepsTest', {
    setup: function() {
      steps = new C.Steps();
    }
  });

  test('譜が追加されること', function() {
    var tetrimino = new C.TetriminoT({ x: 5, y: 5 });
    steps.pushTetrimino(tetrimino, C.Constants.SpinType.None, true);
    steps.pushTetrimino(tetrimino, C.Constants.SpinType.TSpin, false);

    deepEqual(steps.length(), 2);
  });

  test('デシリアライズされること', function() {
    steps.deserialize('1f9m9Aw402dMc00000');

    var ss = steps.steps();
    deepEqual(ss[0].stepType, C.Constants.StepType.HardDrop);
    deepEqual(ss[0].pos, 2);
    deepEqual(ss[0].direction, C.Direction.Right);
    deepEqual(ss[1].stepType, C.Constants.StepType.SoftDrop);
    deepEqual(ss[1].pivot, { x: 5, y: 8 });
    deepEqual(ss[1].direction, C.Direction.Up);
    deepEqual(ss[1].isTSpin, true);
    deepEqual(ss[2].stepType, C.Constants.StepType.Hold);
    deepEqual(ss[3].stepType, C.Constants.StepType.SoftDrop);
    deepEqual(ss[3].pivot, { x: 3, y: 6 });
    deepEqual(ss[3].direction, C.Direction.Up);
    deepEqual(ss[3].isTSpin, true);
    deepEqual(ss[4].stepType, C.Constants.StepType.SoftDrop);
    deepEqual(ss[4].pivot, { x: 4, y: 5} );
    deepEqual(ss[4].direction, C.Direction.Up);
    deepEqual(ss[4].isTSpin, false);
    deepEqual(ss[5].stepType, C.Constants.StepType.HardDrop);
    deepEqual(ss[5].pos, 7);
    deepEqual(ss[5].direction, C.Direction.Up);

    deepEqual(ss.length, 6);
  });

  test('シリアライズされること', function() {
    steps.pushTetrimino(new C.TetriminoI({ x: 2, y: 0 }, C.Direction.Right), C.Constants.SpinType.None, true);
    steps.pushTetrimino(new C.TetriminoT({ x: 5, y: 8 }), C.Constants.SpinType.TSpin, false);
    steps.pushHold();
    steps.pushTetrimino(new C.TetriminoT({ x: 3, y: 6 }), C.Constants.SpinType.TSpinMini, true);
    steps.pushTetrimino(new C.TetriminoS({ x: 4, y: 5 }), C.Constants.SpinType.None, false);
    steps.pushTetrimino(new C.TetriminoS({ x: 7, y: 5 }), C.Constants.SpinType.None, true);

    deepEqual(steps.serialize(), '1f9m9Aw402dMc00000');
  });

  test('セットした譜を進めたり戻ったりできること', function() {
    steps.pushTetrimino(new C.TetriminoI({ x: 2, y: 0 }), C.Constants.SpinType.None, true);
    steps.pushTetrimino(new C.TetriminoT({ x: 5, y: 8 }), C.Constants.SpinType.TSpin, false);
    steps.pushHold();

    deepEqual(steps.forward().stepType, C.Constants.StepType.HardDrop);
    deepEqual(steps.forward().stepType, C.Constants.StepType.SoftDrop);
    deepEqual(steps.forward().stepType, C.Constants.StepType.Hold);
    deepEqual(steps.forward(), null);
    deepEqual(steps.back().stepType, C.Constants.StepType.Hold);
    deepEqual(steps.back().stepType, C.Constants.StepType.SoftDrop);
    deepEqual(steps.back().stepType, C.Constants.StepType.HardDrop);
    deepEqual(steps.back(), null);
  });

  test('譜を忘れること', function() {
    steps.pushTetrimino(new C.TetriminoI({ x: 2, y: 0 }), C.Constants.SpinType.None, true);
    steps.pushTetrimino(new C.TetriminoJ({ x: 2, y: 0 }), C.Constants.SpinType.None, true);
    steps.pushTetrimino(new C.TetriminoL({ x: 2, y: 0 }), C.Constants.SpinType.None, true);
    steps.pushHold();

    steps.forward();
    steps.forgetAfter();

    deepEqual(steps.length(), 1);
    deepEqual(steps.forward(), null);
  });
})();
