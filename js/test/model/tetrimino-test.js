(function() {
  var tetrimino
    , N = C.CellType.None;

  module('TetriminoTest', {
    setup: function() {
      tetrimino = new C.TetriminoT({ x: 5, y: 5 });
    }
  });

  test('ハードドロップされること', function() {
    var field = new C.Field();
    tetrimino.hardDrop(field);
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 0},
      {x: 4, y: 0},
      {x: 6, y: 0},
      {x: 5, y: 1}
    ]);
  });

  test('移動すること', function() {
    tetrimino.move({ x: 1, y: 1});

    deepEqual(tetrimino.blocks(), [
      {x: 6, y: 6},
      {x: 5, y: 6},
      {x: 7, y: 6},
      {x: 6, y: 7}
    ]);
  });

  test('移動可能であること', function() {
    var field = new C.Field();
    deepEqual(tetrimino.canMove(field, { x: -1, y: 0}), true);
  });

  test('移動不可であること', function() {
    var field = new C.Field();
    tetrimino.pivot({ x: 1, y: 5 });
    deepEqual(tetrimino.canMove(field, { x: -1, y: 0}), false);
  });

  test('右回転できること', function() {
    var field = new C.Field();
    tetrimino.pivot({ x: 1, y: 5 });

    var specialInfo = {};
    deepEqual(tetrimino.turnRightIfPossible(field, specialInfo), true);
  });

  test('右回転できないこと', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ]
    );

    tetrimino.pivot({ x: 0, y: 1 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightIfPossible(field, specialInfo), false);
  });

  test('左回転できること', function() {
    var field = new C.Field();
    tetrimino.pivot({ x: 1, y: 5 });

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftIfPossible(field, specialInfo), true);
  });

  test('左回転できないこと', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ]
    );

    tetrimino.pivot({ x: 0, y: 1 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftIfPossible(field, specialInfo), false);
  });
})();
