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

  module('TetriminoTTest', {
    setup: function() {
      tetrimino = new C.TetriminoT({ x: 5, y: 5 });
    }
  });

  test('上向き時の確認', function() { deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 4, y: 5},
      {x: 6, y: 5},
      {x: 5, y: 6}
    ]);
  });

  test('左向きの確認', function() {
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 4, y: 5},
      {x: 5, y: 6},
      {x: 5, y: 4}
    ]);
  });

  test('下向きの確認', function() {
    tetrimino.turnLeft();
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 4, y: 5},
      {x: 6, y: 5},
      {x: 5, y: 4}
    ]);
  });

  test('右向きの確認', function() {
    tetrimino.turnRight();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 6, y: 5},
      {x: 5, y: 6},
      {x: 5, y: 4}
    ]);
  });

  test('Ｔスピンにならないこと（左回転）', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [S, N, Z, N, N, N, N, N, N, N]
      ]
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);

    specialInfo = {}
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);

    specialInfo = {}
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);

    specialInfo = {}
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('Ｔスピンになること（左回転）', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [S, N, Z, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);

    specialInfo = {}
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);

    specialInfo = {}
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);

    specialInfo = {}
    tetrimino.turnLeftIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);
  });

  test('Ｔスピンにならないこと（右回転）', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [S, N, Z, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);

    specialInfo = {}
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);

    specialInfo = {}
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);

    specialInfo = {}
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('Ｔスピンになること（右回転）', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [S, N, Z, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);

    specialInfo = {}
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);

    specialInfo = {}
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);

    specialInfo = {}
    tetrimino.turnRightIfPossible(field, specialInfo);
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);
  });

  test('SRパターン(ul1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ul2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, L, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 2 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ul3)の確認', function() {
    // ul3はTミノでは存在しない
    ok(true);
  });

  test('SRパターン(ul4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N]
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ur1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 0, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpinMini);
  });

  test('SRパターン(ur2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, L, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 0, y: 2 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ur3)の確認', function() {
    // ur3はTミノでは存在しない
    ok(true);
  });

  test('SRパターン(ur4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [L, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, L, N, N, N, N, N, N, N],
        [N, L, L, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 3 });
    tetrimino.direction(C.Direction.Up);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 0, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpinMini);
  });

  test('SRパターン(ll1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ll2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [L, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 2 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ll3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 2 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 4 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(ll4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 2 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 4 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(lr1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(lr2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 0 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpinMini);
  });

  test('SRパターン(lr3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, L, N, N, N, N, N, N],
        [L, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 3 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(lr4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, L, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [L, N, N, L, N, N, N, N, N, N],
        [L, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Left);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 3 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(dl1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 3 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(dl2)の確認', function() {
    // dl2はTミノでは存在しない
    ok(true);
  });

  test('SRパターン(dl3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(dl4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(dr1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 1 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(dr2)の確認', function() {
    // dr2はTミノでは存在しない
    ok(true);
  });

  test('SRパターン(dr3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 1, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(dr4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, L, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 1, y: 3 });
    tetrimino.direction(C.Direction.Down);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(rl1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(rl2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 0 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpinMini);
  });

  test('SRパターン(rl3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 3 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(rl4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnLeftSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 3 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(rr1)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 1 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(rr2)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, L, N, L, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 2 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 1 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.TSpin);
  });

  test('SRパターン(rr3)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N],
        [N, N, L, N, L, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 2 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 2, y: 4 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });

  test('SRパターン(rr4)の確認', function() {
    var field = C.FieldUtil.make(
      [
        [N, L, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, L, N, N, L, N, N, N, N, N],
        [N, N, N, N, L, N, N, N, N, N],
        [N, N, L, N, L, N, N, N, N, N]
      ].reverse()
    );

    tetrimino.pivot({ x: 2, y: 2 });
    tetrimino.direction(C.Direction.Right);

    var specialInfo = {};
    deepEqual(tetrimino.turnRightSuperlyIfPossible(field, specialInfo), true);
    deepEqual(tetrimino.pivot(), { x: 3, y: 4 });
    deepEqual(specialInfo.spinType, C.Constants.SpinType.None);
  });
})();

