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

  module('TetriminoITest', {
    setup: function() {
      tetrimino = new C.TetriminoI({ x: 5, y: 5 });
    }
  });

  test('上向き時の確認', function() {
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 4, y: 5},
      {x: 6, y: 5},
      {x: 7, y: 5}
    ]);
  });

  test('左向きの確認', function() {
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 4},
      {x: 5, y: 3},
      {x: 5, y: 5},
      {x: 5, y: 6}
    ]);
  });

  test('下向きの確認', function() {
    tetrimino.turnLeft();
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 6, y: 4},
      {x: 7, y: 4},
      {x: 5, y: 4},
      {x: 4, y: 4}
    ]);
  });

  test('右向きの確認', function() {
    tetrimino.turnRight();
    deepEqual(tetrimino.blocks(), [
      {x: 6, y: 5},
      {x: 6, y: 6},
      {x: 6, y: 4},
      {x: 6, y: 3}
    ]);
  });

  test('SRパターン(ul1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 3 });
  });

  test('SRパターン(ul2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 3 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ul3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, L, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 5 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ul4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 2 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ur1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 0, y: 3 });
  });

  test('SRパターン(ur2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 3 });
  });

  test('SRパターン(ul3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, L, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 0, y: 2 });
  });

  test('SRパターン(ur4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, L, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 5 });
  });

  test('SRパターン(ll1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 3 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 3 });
  });

  test('SRパターン(ll2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 4, y: 3 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 3 });
  });

  test('SRパターン(ll3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 4, y: 3 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 2 });
  });

  test('SRパターン(ll4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, L, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 4, y: 3 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 5, y: 5 });
  });

  test('SRパターン(lr1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 4, y: 2 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 2 });
  });

  test('SRパターン(lr2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 2 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 2 });
  });

  test('SRパターン(lr3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 2 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 0 });
  });

  test('SRパターン(lr4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, L, N, N, N, N, L, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, L, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 3, y: 2 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 3 });
  });

  test('SRパターン(dl1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 3, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 3 });
  });

  test('SRパターン(dl2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, L, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 3, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 3 });
  });

  test('SRパターン(dl3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 3, y: 4 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 2 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(dl4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, L, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 3, y: 4 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 5 });
  });

  test('SRパターン(dr1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 4 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 4 });
  });

  test('SRパターン(dr2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 4 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 4 });
  });

  test('SRパターン(dr3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, L, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 4 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 5 });
  });

  test('SRパターン(dr4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N],
        [N, N, L, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 4 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 2 });
  });

  test('SRパターン(rl1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 3 });
  });

  test('SRパターン(rl2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 3 });
  });

  test('SRパターン(rl3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, L, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 4 });
  });

  test('SRパターン(rl4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 1 });
  });

  test('SRパターン(rr1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
        [N, N, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 3 });
  });

  test('SRパターン(rr2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 3 });
  });

  test('SRパターン(rr3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 5 });
  });

  test('SRパターン(rr4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 4, y: 2 });
  });
})();

