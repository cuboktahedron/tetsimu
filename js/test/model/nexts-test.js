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
      C.CellType.L,
      C.CellType.Z
    ]);

    deepEqual(nexts.next(), C.CellType.J);
    deepEqual(nexts.next(), C.CellType.L);
    deepEqual(nexts.next(), C.CellType.Z);
  });

  test('デシリアライズされること', function() {
    nexts.deserialize('asKU');
    nexts.next();
    nexts.deserialize('asKU');

    deepEqual(nexts.types(), [
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
    nexts.next();

    deepEqual(nexts.serialize(), 'asKU');
  });
})();
