(function() {
  var tetrimino
    , N = C.CellType.None
    , I = C.CellType.I
    , J = C.CellType.J
    , L = C.CellType.L
    , O = C.CellType.O
    , S = C.CellType.S
    , T = C.CellType.T
    , Z = C.CellType.Z
    , M = C.CellType.Ojama
    , W = C.CellType.Wall
    , N = C.CellType.None;

  module('TetriminoLTest', {
    setup: function() {
      tetrimino = new C.TetriminoL({ x: 5, y: 5 });
    }
  });

  test('上向き時の確認', function() {
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 4, y: 5},
      {x: 6, y: 5},
      {x: 6, y: 6}
    ]);
  });

  test('左向きの確認', function() {
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 5, y: 4},
      {x: 5, y: 6},
      {x: 4, y: 6}
    ]);
  });

  test('下向きの確認', function() {
    tetrimino.turnLeft();
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 6, y: 5},
      {x: 4, y: 5},
      {x: 4, y: 4}
    ]);
  });

  test('右向きの確認', function() {
    tetrimino.turnRight();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 5, y: 6},
      {x: 5, y: 4},
      {x: 6, y: 4}
    ]);
  });

  test('SRパターン(ul3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, O, N, N, N, N, N, N],
        [N, O, O, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, O, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 1 });
  });

  test('SRパターン(ur3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, O, N, N, N, N, N, N, N, N],
        [N, N, O, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, O, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 1 });
  });

  test('SRパターン(dl2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, O, O, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 4 });
  });

  test('SRパターン(dr2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, O, O, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 4 });
  });
})();

