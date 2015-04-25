(function() {
  'use strict';

  module('UrlParameterTest');

  test('空のオブジェクトが返ること', function() {
    deepEqual(C.UrlParameter.parse('http://localhost/tetsimu/index.html'), {});
  });

  test('URLパラメータがJSON形式で返ること', function() {
    deepEqual(C.UrlParameter.parse('http://localhost/tetsimu/index.html?param1=&param2=123&param3=abc'), {
      param1: '',
      param2: '123',
      param3: 'abc'
    });
  });
})();
