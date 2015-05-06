(function() {
  var field
    , N = C.CellType.None
    , I = C.CellType.I
    , J = C.CellType.J
    , L = C.CellType.L
    , O = C.CellType.O
    , S = C.CellType.S
    , T = C.CellType.T
    , Z = C.CellType.Z
    , M = C.CellType.Ojama
    , W = C.CellType.Wall;

  module('FieldTest', {
    setup: function() {
      field = new C.Field();
    }
  });

  test('フィールドに設定した値が取得で切ること', function() {
    field.type(0, 0, C.CellType.T);
    deepEqual(field.type(0, 0), C.CellType.T);
  });

  test('フィールの境界テスト', function() {
    deepEqual(field.type(0, 0), C.CellType.None);
    deepEqual(field.type(C.Field.DEFAULT_WIDTH - 1, 0), C.CellType.None);
    deepEqual(field.type(0, 0), C.CellType.None);
    deepEqual(field.type(0, C.Field.DEFAULT_HEIGHT - 1), C.CellType.None);

    deepEqual(field.type(-1, 0), C.CellType.Wall);
    deepEqual(field.type(C.Field.DEFAULT_WIDTH , 0), C.CellType.Wall);
    deepEqual(field.type(0, -1), C.CellType.Wall);
    deepEqual(field.type(0, C.Field.DEFAULT_HEIGHT), C.CellType.Wall);
  });

  test('ミノが設置されること', function() {
    var tetrimino = new C.TetriminoT({ x: 5, y: 5 });

    field.settle(tetrimino);
    deepEqual(field.type(5, 5), C.CellType.T);
    deepEqual(field.type(4, 5), C.CellType.T);
    deepEqual(field.type(6, 5), C.CellType.T);
    deepEqual(field.type(5, 6), C.CellType.T);
  });

  test('フィールド状態が復元されること', function() {
    //
      // 0123456789
      //     000000 :0  :0
      //     000100 :4  :4
      //     100011 :35 :z
      //     010001 :17 :h
      //     010110 :22 :m
      //     011110 :30 :u
      //     001001 :9  :9
      //
      // 1234567890
      //     000001 :1  :1
      //     001000 :8  :8
      //     110100 :52 :Q
      //     010101 :21 :l
      //     100111 :39 :D
      //     100010 :34 :y
      //     010000 :16 :g

    field.deserialize('04zhmu918QlDyg');
    deepEqual(field.types().reverse(),
              [
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, N, N, N, N, N, N, N, N, N],
                [N, I, J, L, O, S, T, Z, M, W],
                [I, J, L, O, S, T, Z, M, W, N]
              ]);
  });

  test('フィールド状態文字列が取得できること', function() {
    field = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, I, J, L, O, S, T, Z, M, W],
        [I, J, L, O, S, T, Z, M, W, N]
      ].reverse()
    );

    deepEqual(field.serialize(), '04zhmu918QlDyg');
  });


  test('ラインクリアされないこと', function() {
    deepEqual(field.clearLine(), 0);
  });

  test('ラインクリアされること', function() {
    field = C.FieldUtil.make(
      [
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [N, N, N, N, N, N, N, N, N, M],
        [N, N, N, N, N, N, N, N, M, N],
        [N, N, N, N, N, N, N, M, N, N],
        [N, N, N, N, N, N, M, N, N, N],
        [N, N, N, N, N, M, N, N, N, N],
        [N, N, N, N, M, N, N, N, N, N],
        [N, N, N, M, N, N, N, N, N, N],
        [N, N, M, N, N, N, N, N, N, N],
        [N, M, N, N, N, N, N, N, N, N],
        [M, N, N, N, N, N, N, N, N, N],
        [I, J, L, O, S, T, Z, M, M, M], // clear
        [I, J, L, O, S, T, Z, M, M, N], 
        [Z, T, S, O, L, J, I, I, I, I], // clear
        [M, M, M, M, M, M, M, M, M, M]  // clear
      ].reverse()
    );

    deepEqual(field.clearLine(), 3, '消去ライン数の確認');

    var afterField = C.FieldUtil.make(
      [
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [N, N, N, N, N, N, N, N, N, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [I, J, L, O, S, T, Z, M, M, N],
        [N, N, N, N, N, N, N, N, N, M],
        [N, N, N, N, N, N, N, N, M, N],
        [N, N, N, N, N, N, N, M, N, N],
        [N, N, N, N, N, N, M, N, N, N],
        [N, N, N, N, N, M, N, N, N, N],
        [N, N, N, N, M, N, N, N, N, N],
        [N, N, N, M, N, N, N, N, N, N],
        [N, N, M, N, N, N, N, N, N, N],
        [N, M, N, N, N, N, N, N, N, N],
        [M, N, N, N, N, N, N, N, N, N],
        [I, J, L, O, S, T, Z, M, M, N]
      ].reverse()
    );

    deepEqual(field.types(), afterField.types(), 'クリア後のフィールド状態の確認');
  });

  test('パーフェクトクリア状態であること', function() {
    deepEqual(field.isPerfectCleared(), true);
  });

  test('パーフェクトクリア状態ではないこと', function() {
    field.type(0, 0, C.CellType.T);

    deepEqual(field.isPerfectCleared(), false);
  });
})();

