(function() {
  var nexts; 
  module('NextsTest', {
    setup: function() {
      nexts = new C.Nexts();
    }
  });

  test('追加した順にツモが取得できること', function() {
    nexts.push(C.CellType.I);
    nexts.push(C.CellType.T);
    nexts.push(C.CellType.S);

    deepEqual(nexts.next(), C.CellType.I);
    deepEqual(nexts.next(), C.CellType.T);
    deepEqual(nexts.next(), C.CellType.S);
  });

  test('セットした順にツモが取得できること', function() {
    nexts.types([
      C.CellType.J,
      C.CellType.L, C.CellType.Z
    ]);

    deepEqual(nexts.next(), C.CellType.J);
    deepEqual(nexts.next(), C.CellType.L);
    deepEqual(nexts.next(), C.CellType.Z);
  });

  test('未設定部のツモが補完されること', function() {
    var nextGenerator = new C.NextGenerator()
      , types =
      [
        C.CellType.None,
        C.CellType.J,
        C.CellType.None,
        C.CellType.L,
        C.CellType.None,
        C.CellType.Z,
        C.CellType.None,
      ]
      , prevTypes =
      [
        C.CellType.T,
        C.CellType.S,
      ];

    nexts.setAndComplementTypes(types, prevTypes, nextGenerator);

    var afterTypes = [];
    afterTypes[0] = nexts.next();
    afterTypes[1] = nexts.next();
    afterTypes[2] = nexts.next();
    afterTypes[3] = nexts.next();
    afterTypes[4] = nexts.next();
    afterTypes[5] = nexts.next();
    afterTypes[6] = nexts.next();

    deepEqual(afterTypes[1], C.CellType.J);
    deepEqual(afterTypes[3], C.CellType.L);
    deepEqual(afterTypes[5], C.CellType.Z);

    var duplicatedTypes = prevTypes.concat(afterTypes).filter(function (type, i, self) {
      return self.indexOf(type) !== i;
    });
    deepEqual(duplicatedTypes.length, 2);
  });

  test('7組1セット内に同一ミノが出現した場合はそこから次の7組1セットが始まること', function() {
    var nextGenerator = new C.NextGenerator()
      , types =
      [
        C.CellType.I,
        C.CellType.None,
        C.CellType.J,
        C.CellType.I,
        C.CellType.None,
        C.CellType.None,
        C.CellType.None,
        C.CellType.None,
        C.CellType.None,
        C.CellType.None,
      ]

    nexts.setAndComplementTypes(types, [], nextGenerator);

    var afterTypes = [];
    afterTypes[0] = nexts.next();
    afterTypes[1] = nexts.next();
    afterTypes[2] = nexts.next();
    afterTypes[3] = nexts.next();
    afterTypes[4] = nexts.next();
    afterTypes[5] = nexts.next();
    afterTypes[6] = nexts.next();
    afterTypes[7] = nexts.next();
    afterTypes[8] = nexts.next();
    afterTypes[9] = nexts.next();
    deepEqual(afterTypes[0], C.CellType.I);
    deepEqual(afterTypes[2], C.CellType.J);

    var duplicatedTypes = afterTypes.slice(3).filter(function (type, i, self) {
      return self.indexOf(type) !== i;
    });
    deepEqual(duplicatedTypes.length, 0);
  });

  test('固定ツモかどうかが判定できること', function() {
    var nextGenerator = new C.NextGenerator()
      , types =
      [
        C.CellType.I,
        C.CellType.None,
        C.CellType.J,
        C.CellType.L,
        C.CellType.None
      ]

    nexts.setAndComplementTypes(types, [], nextGenerator);

    var typesFixed = nexts.nextTypesFixed();
    deepEqual(typesFixed, [
      true,
      false,
      true,
      true,
      false,
    ]);
  });

  test('追加したツモは固定ツモではないこと', function() {
    nexts.push(C.CellType.I);

    deepEqual(nexts.nextTypesFixed(), []);
  });

  test('デシリアライズされること', function() {
    nexts.deserialize('9jBT');
    nexts.next();
    nexts.deserialize('9jBT');

    deepEqual(nexts.types(), [
      C.CellType.I,
      C.CellType.I,
      C.CellType.J,
      C.CellType.L,
      C.CellType.O,
      C.CellType.S,
      C.CellType.T,
      C.CellType.Z
    ]);

    deepEqual(nexts.no(), -1);
  });

  test('シリアライズされること', function() {
    nexts.types([
      C.CellType.I,
      C.CellType.I,
      C.CellType.J,
      C.CellType.L,
      C.CellType.O,
      C.CellType.S,
      C.CellType.T,
      C.CellType.Z
    ]);
    deepEqual(nexts.serialize(), '9jBT');

    nexts.next();
    deepEqual(nexts.serialize(), '9jBT');
  });

  test('指定位置のツモが取得できること', function() {
    nexts.push(C.CellType.I);
    nexts.push(C.CellType.T);
    nexts.push(C.CellType.S);

    deepEqual(nexts.typeAt(1), C.CellType.T);
    deepEqual(nexts.typeAt(3), C.CellType.None);
  });

  test('指定位置にツモが設定できること', function() {
    nexts.push(C.CellType.I);
    nexts.push(C.CellType.T);
    nexts.push(C.CellType.S);

    nexts.typeAt(1, C.CellType.Z);
    deepEqual(nexts.typeAt(1), C.CellType.Z);
  });

  test('数手先にツモを設定した場合間はNoneで埋められること', function() {
    nexts.types([C.CellType.I]);

    nexts.typeAt(3, C.CellType.Z);
    deepEqual(nexts.types(), [
      C.CellType.I,
      C.CellType.None,
      C.CellType.None,
      C.CellType.Z,
    ]);
  });

  test('指定してツモを設定した場合末尾のNoneが削除されること', function() {
    nexts.types([
      C.CellType.I,
      C.CellType.None,
      C.CellType.None,
      C.CellType.Z
    ]);

    nexts.typeAt(3, C.CellType.None);
    deepEqual(nexts.types(), [ C.CellType.I ]);
  });

  test('指定した位置にツモを挿入できること', function() {
    nexts.types([
      C.CellType.I,
      C.CellType.J,
      C.CellType.L,
      C.CellType.O,
    ]);

    nexts.insert(3, C.CellType.Z);
    deepEqual(nexts.types(), [
      C.CellType.I,
      C.CellType.J,
      C.CellType.L,
      C.CellType.Z,
      C.CellType.O,
    ]);
  });

  test('未設定箇所にツモを挿入できること', function() {
    nexts.insert(3, C.CellType.Z);
    deepEqual(nexts.types(), [
      C.CellType.None,
      C.CellType.None,
      C.CellType.None,
      C.CellType.Z,
    ]);
  });

  test('指定した位置のツモを削除できること', function() {
    nexts.types([
      C.CellType.I,
      C.CellType.J,
      C.CellType.L,
      C.CellType.O,
    ]);

    nexts.delete(2);
    deepEqual(nexts.types(), [
      C.CellType.I,
      C.CellType.J,
      C.CellType.O,
    ]);
  });

  test('未設定箇所のツモを削除してもエラーとならないこと', function() {
    nexts.types([
      C.CellType.I,
    ]);

    nexts.delete(3);
    deepEqual(nexts.types(), [
      C.CellType.I,
    ]);
  });

})();
