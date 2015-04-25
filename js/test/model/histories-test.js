(function() {
  'use strict';

  var histories
    , current
    , field
    , nexts
    , hold
    , description

  module('HistoriesTest', {
    setup: function() {
      current = new C.TetriminoT(),
      histories = new C.Histories();
      field = new C.Field();
      nexts = new C.Nexts();
      hold = new C.Hold();
      description = new C.Description();
    }
  });

  test('2件以上履歴があると戻れること', function() {
    deepEqual(histories.canBack(), false);

    histories.push(current, field, nexts, hold, description);
    deepEqual(histories.canBack(), false);

    histories.push(current, field, nexts, hold, description);
    deepEqual(histories.canBack(), true);
  });

  test('最大件数以上の履歴が保持されないこと', function() {
    histories = new C.Histories({
      maxHistoryNum: 3
    });

    histories.push(current, field, nexts, hold, description);
    histories.push(current, field, nexts, hold, description);
    histories.push(current, field, nexts, hold, description);
    histories.push(current, field, nexts, hold, description);
    histories.push(current, field, nexts, hold, description);

    deepEqual(histories.length(), 3);
  });

  test('過去の履歴に戻れること', function() {
    var history;
    histories.push(current, field, nexts, hold, description);
    histories.push(current, field, nexts, hold, description);
    history = histories.current();
    histories.push(current, field, nexts, hold, description);
    histories.back();

    deepEqual(histories.current().id(), history.id());
  });
})();

