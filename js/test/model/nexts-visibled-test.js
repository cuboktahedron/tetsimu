(function() {
  var visibled;
  module('NextsVisibledTest', {
    setup: function() {
      visibled = new C.NextsVisibled();
    }
  });

  test('初期値は全て表示であること', function() {
    deepEqual(visibled.status(), [ true, true, true, true, true ]);
  });

  test('表示非表示が設定で切ること', function() {
    visibled.toggleVisible(0);
    deepEqual(visibled.status(), [ false, true, true, true, true ]);

    visibled.toggleVisible(0);
    deepEqual(visibled.status(), [ true, true, true, true, true ]);
  });

  test('シリアライズされること', function() {
    visibled.toggleVisible(1);
    visibled.toggleVisible(3);
    visibled.toggleVisible(4);

    deepEqual(visibled.serialize(), '5');
  });

  test('デシリアライズされること', function() {
    visibled.deserialize('5');

    deepEqual(visibled.status(), [ true, false, true, false, false ]);
  });
})();
