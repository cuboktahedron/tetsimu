(function() {
  var tetrimino;

  module('TetriminoOTest', {
    setup: function() {
      tetrimino = new C.TetriminoO({ x: 5, y: 5 });
    }
  });

  test('上向き時の確認', function() {
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 5, y: 6},
      {x: 6, y: 6},
      {x: 6, y: 5}
    ]);
  });

  test('左向きの確認', function() {
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 5, y: 6},
      {x: 6, y: 6},
      {x: 6, y: 5}
    ]);
  });

  test('下向きの確認', function() {
    tetrimino.turnLeft();
    tetrimino.turnLeft();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 5, y: 6},
      {x: 6, y: 6},
      {x: 6, y: 5}
    ]);
  });

  test('右向きの確認', function() {
    tetrimino.turnRight();
    deepEqual(tetrimino.blocks(), [
      {x: 5, y: 5},
      {x: 5, y: 6},
      {x: 6, y: 6},
      {x: 6, y: 5}
    ]);
  });
})();
