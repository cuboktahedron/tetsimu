/**
 * @jsx React.DOM
 */
var OperationSimuPanel = React.createClass({
  getInitialState: function() {
    return {
      configuring: false,
      keyConfig: C.ConfigStore.keyConfig(C.Constants.Mode.Simu),
      seed: C.SimuStore.seed(),
      urlParameters: C.SimuStore.urlParameters()
    };
  },

  componentDidMount: function() {
    C.ControllerStore.addKeyListener(this.onKey);
    C.SimuStore.addChangeListener(this.onChange);
    C.SimuStore.addSetUrlListener(this.onSetUrl);
    C.ConfigStore.addChangeListener(this.onConfigChange);
    C.ConfigStore.addCancelListener(this.onConfigCancel);
  },

  componentWillUnmount: function() {
    C.ControllerStore.removeKeyListener(this.onKey);
    C.SimuStore.removeChangeListener(this.onChange);
    C.SimuStore.removeSetUrlListener(this.onSetUrl);
    C.ConfigStore.removeChangeListener(this.onConfigChange);
    C.ConfigStore.removeCancelListener(this.onConfigCancel);
  },

  onKey: function(state) {
    if (this.state.configuring) {
      return;
    }

    var action = this.state.keyConfig[state.keyName];
    if (action == null) {
      return;
    }

    // キーに対応するアクションを実行
    this['_' + action](state);
  },

  _hardDrop: function(state) {
    if (state.down) {
      this.onHardDrop();
    }
  },

  onHardDrop: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.hardDrop();
  },

  _softDrop: function(state) {
    if (state.intervalDown) {
      this.onSoftDrop();
    }
  },

  onSoftDrop: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.softDrop();
  },

  _leftMove: function(state) {
    if (state.intervalDown) {
      this.onLeftMove();
    }
  },

  onLeftMove: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.leftMove();
  },

  _rightMove: function(state) {
    if (state.intervalDown) {
      this.onRightMove();
    }
  },

  onRightMove: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.rightMove();
  },

  _turnLeft: function(state) {
    if (state.down) {
      this.onTurnLeft();
    }
  },

  onTurnLeft: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.turnLeft();
  },

  _turnRight: function(state) {
    if (state.down) {
      this.onTurnRight();
    }
  },

  onTurnRight: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.turnRight();
  },

  _hold: function(state) {
    if (state.down) {
      this.onHold();
    }
  },

  onHold: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.hold();
  },

  _retry: function(state) {
    if (state.intervalDown) {
      this.onRetry();
    }
  },

  onRetry: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.retry(this.props.context, false);
  },

  _superRetry: function(state) {
    if (state.intervalDown) {
      this.onSuperRetry();
    }
  },

  onSuperRetry: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.retry(this.props.context, true);
  },

  _clear: function(state) {
    if (state.down) {
      this.onClear();
    }
  },

  onClear: function() {
    if (this.state.configuring) {
      return;
    }

    C.OperationSimuPanelAction.clear();
  },

  _back: function(state) {
    if (state.intervalDown) {
      this.onBack();
    }
  },

  onBack: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.back();
  },

  _forward: function(state) {
    if (state.intervalDown) {
      this.onForward();
    }
  },

  onForward: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.forward();
  },

  _configure: function(state) {
    if (state.down) {
      this.setState({
        configuring: true
      });
    }
  },

  _createUrlParameters: function(state) {
    if (state.down) {
      this.onCreateUrlParameters();
    }
  },

  onCreateUrlParameters: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.createUrlParameters();
  },

  onConfigure: function() {
    if (this.state.configuring) {
      return;
    }

    this.setState({ configuring: true });
  },

  onChange: function() {
    this.setState({
      seed: C.SimuStore.seed()
    });
  },

  onSetUrl: function() {
    this.setState({
      urlParameters: C.SimuStore.urlParameters()
    });

    setTimeout(function() {
      $('#url-output').select();
    }, 0);
  },

  _changeModeToEdit: function(state) {
    if (state.down) {
      this.onChangeModeToEdit();
    }
  },

  onChangeModeToEdit: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.changeModeToEdit(this.props.context);
  },

  _changeModeToReplay: function(state) {
    if (state.down) {
      this.onChangeModeToReplay();
    }
  },

  onChangeModeToReplay: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationSimuPanelAction.changeModeToReplay(this.props.context);
  },

  onConfigChange: function() {
    this.setState({
      configuring: false,
      keyConfig: C.ConfigStore.keyConfig(C.Constants.Mode.Simu)
    });
  },

  onConfigCancel: function() {
    this.setState({
      configuring: false
    });
  },

  render: function() {
    var url = '';
    if (!!this.state.urlParameters) {
      url = location.href.split('?')[0] + '?' + this.state.urlParameters;
    }

    return <div className="operation-panel">
        <h1>OPERATION</h1>
        <div className="operation-mode-panel">
          <div className="operation-simu-panel">
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onBack}>&lt;</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onForward}>&gt;</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onRetry}>リトライ</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onSuperRetry}>スーパーリトライ</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onClear}>クリア</a>

            <div className="operation-sub-title">MODE</div>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onChangeModeToReplay}>Replay</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onChangeModeToEdit}>Edit</a>

            <div className="operation-sub-title">TOOL</div>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onCreateUrlParameters}>URL出力</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onConfigure}>設定</a>
            <textarea id="url-output" className="url" readOnly="true" value={url} />

            <div className="bottom">
              <span className="seed">seed: {('000000' + this.state.seed).slice(-6)}</span>
            </div>
          </div>
          {this.state.configuring ? <ConfigPanel /> : false}
        </div>
      </div>
  }
});


