(function() {
  var keyButton;

  module('KeyButtonTest', {
    setup: function() {
      keyButton = new C.KeyButton();
    }
  });

  test('キー入力状態が取得できること', function() {
    deepEqual(keyButton.state(), {
      down: false,
      up: false,
      active: false,
      intervalDown: false
    }, 'initial state');

    keyButton.keyDown();

    deepEqual(keyButton.state(), {
      down: true,
      up: false,
      active: true,
      intervalDown: true
    }, 'after first keydown');

    keyButton.keyDown();

    deepEqual(keyButton.state(), {
      down: false,
      up: false,
      active: true,
      intervalDown: false
    }, 'after second keydown');

    keyButton.keyUp();

    deepEqual(keyButton.state(), {
      down: false,
      up: true,
      active: false,
      intervalDown: false
    }, 'after keyup');
  });

  test('周期入力の確認', function() {
    stop();

    keyButton.configure({
      interval1: 0.1,
      interval2: 0.05
    });

    keyButton.keyDown();
    deepEqual(keyButton.state().intervalDown, true, 'after first keydown');

    $.Deferred(function(d) {
      setTimeout(function() {
        keyButton.keyDown();
        deepEqual(keyButton.state().intervalDown, false);
        d.resolve();
      }, 0.06 * 1000);

      return d.promise();
    }).then(function() {
      var d = $.Deferred();
      setTimeout(function() {
        keyButton.keyDown();
        deepEqual(keyButton.state().intervalDown, true);
        d.resolve();
      }, 0.06 * 1000);

      return d.promise();
    }).then(function() {
      var d = $.Deferred();
      setTimeout(function() {
        keyButton.keyDown();
        deepEqual(keyButton.state().intervalDown, false);
        d.resolve();
      }, 0.03 * 1000);

      return d.promise();
    }).then(function() {
      var d = $.Deferred();
      setTimeout(function() {
        keyButton.keyDown();
        deepEqual(keyButton.state().intervalDown, true);
        d.resolve();
        start();
      }, 0.03 * 1000);
    }).promise();
  });
})();

