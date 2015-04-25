(function() {
  var description;

  module('DescriptionTest', {
    setup: function() {
      description = new C.Description();
    }
  });

  test('技なし確認', function() {
    deepEqual(description.data(), {
      ren: 0,
      b2b: false,
      trick: C.Constants.Trick.None
    });
  });

  test('１ライン消し確認', function() {
    description.ren(1);
    description.clearLineNum(1);
    description.fixData();

    deepEqual(description.data(), {
      ren: 1,
      b2b: false,
      trick: C.Constants.Trick.Single
    });
  });

  test('TSSM確認', function() {
    description.ren(1);
    description.spinType(C.Constants.SpinType.TSpinMini);
    description.clearLineNum(1);
    description.fixData();

    deepEqual(description.data(), {
      ren: 1,
      b2b: false,
      trick: C.Constants.Trick.TSSM
    });
  });

  test('TSS確認', function() {
    description.ren(1);
    description.spinType(C.Constants.SpinType.TSpin);
    description.clearLineNum(1);
    description.fixData();

    deepEqual(description.data(), {
      ren: 1,
      b2b: false,
      trick: C.Constants.Trick.TSS
    });
  });

  test('２ライン消し確認', function() {
    description.ren(2);
    description.clearLineNum(2);
    description.fixData();

    deepEqual(description.data(), {
      ren: 2,
      b2b: false,
      trick: C.Constants.Trick.Double
    });
  });

  test('TSD確認', function() {
    description.ren(1);
    description.spinType(C.Constants.SpinType.TSpinMini);
    description.clearLineNum(2);
    description.fixData();

    deepEqual(description.data(), {
      ren: 1,
      b2b: false,
      trick: C.Constants.Trick.TSD
    });

    description.spinType(C.Constants.SpinType.TSpin);
    description.fixData();

    deepEqual(description.data(), {
      ren: 1,
      b2b: true,
      trick: C.Constants.Trick.TSD
    });
  });

  test('３ライン消し確認', function() {
    description.ren(2);
    description.clearLineNum(3);
    description.fixData();

    deepEqual(description.data(), {
      ren: 2,
      b2b: false,
      trick: C.Constants.Trick.Triple
    });
  });

  test('TST確認', function() {
    description.ren(1);
    description.spinType(C.Constants.SpinType.TSpinMini);
    description.clearLineNum(3);
    description.fixData();

    deepEqual(description.data(), {
      ren: 1,
      b2b: false,
      trick: C.Constants.Trick.TST
    });

    // このパターンは実際ありえない
    description.spinType(C.Constants.SpinType.TSpin);
    description.fixData();

    deepEqual(description.data(), {
      ren: 1,
      b2b: true,
      trick: C.Constants.Trick.TST
    });
  });

  test('テトリス確認', function() {
    description.ren(2);
    description.clearLineNum(4);
    description.fixData();

    deepEqual(description.data(), {
      ren: 2,
      b2b: false,
      trick: C.Constants.Trick.Tetris
    });
  });

  test('TS確認', function() {
    description.ren(0);
    description.spinType(C.Constants.SpinType.TSpin);
    description.clearLineNum(0);
    description.fixData();

    deepEqual(description.data(), {
      ren: 0,
      b2b: false,
      trick: C.Constants.Trick.TS
    });
  });

  test('TSM確認', function() {
    description.ren(0);
    description.spinType(C.Constants.SpinType.TSpinMini);
    description.clearLineNum(0);
    description.fixData();

    deepEqual(description.data(), {
      ren: 0,
      b2b: false,
      trick: C.Constants.Trick.TSM
    });
  });
})();
