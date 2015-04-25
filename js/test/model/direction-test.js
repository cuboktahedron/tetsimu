(function() {
  module('DirectionTest');

  test('左回転すること', function() {
    deepEqual(C.Direction.turnLeft(C.Direction.Up), C.Direction.Left);
    deepEqual(C.Direction.turnLeft(C.Direction.Left), C.Direction.Down);
    deepEqual(C.Direction.turnLeft(C.Direction.Down), C.Direction.Right);
    deepEqual(C.Direction.turnLeft(C.Direction.Right), C.Direction.Up);
  });

  test('不正な引数を渡すとErrorがスローされること(左回転)', function() {
    throws(function() { C.Direction.turnLeft('a') }, Error);
  });

  test('右回転すること', function() {
    deepEqual(C.Direction.turnRight(C.Direction.Up), C.Direction.Right);
    deepEqual(C.Direction.turnRight(C.Direction.Left), C.Direction.Up);
    deepEqual(C.Direction.turnRight(C.Direction.Down), C.Direction.Left);
    deepEqual(C.Direction.turnRight(C.Direction.Right), C.Direction.Down);
  });

  test('不正な引数を渡すとErrorがスローされること(右回転)', function() {
    throws(function() { C.Direction.turnRight('a') }, Error);
  });
})();
