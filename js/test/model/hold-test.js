(function() {
  var hold;

  module('HoldTest', {
    setup: function() {
      hold = new C.Hold();
    }
  });

  test('ホールドされること', function() {
    var prev = hold.exchange(C.CellType.I);
    deepEqual(hold.type(), C.CellType.I);
    deepEqual(prev, C.CellType.None);
  });

  test('連続でホールドできないこと', function() {
    hold.exchange(C.CellType.I);
    ok(!hold.canExchange(), 'can exchange');
    throws(function() {
      hold.exchange();
    }, Error, 'cannot exchange');

    hold.release();
    ok(hold.canExchange(), 'after release, can exchange');
  });

  test('デシリアライズされること', function() {
    hold.deserialize('5');

    deepEqual(hold.type(), '2');
    deepEqual(hold.canExchange(), false);

    hold.deserialize('4');

    deepEqual(hold.type(), '2');
    deepEqual(hold.canExchange(), true);
  });

  test('シリアライズされること', function() {
    hold.exchange(C.CellType.I);

    var result = hold.serialize();
    deepEqual(hold.serialize(), '3');

    hold.release();
    deepEqual(hold.serialize(), '2');
  });
})();

