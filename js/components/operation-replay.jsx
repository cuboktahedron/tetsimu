/**
 * @jsx React.DOM
 */
var OperationReplayPanel = React.createClass({
  getInitialState: function() { return {
      before: this.props.context.before,
      configuring: false,
      keyConfig: C.ConfigStore.keyConfig(C.Constants.Mode.Replay),
      urlParameters: C.ReplayStore.urlParameters()
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
    C.ControllerStore.addKeyListener(this.onKey);
    C.ReplayStore.addSetUrlListener(this.onSetUrl);
    C.ConfigStore.addChangeListener(this.onConfigChange);
    C.ConfigStore.addCancelListener(this.onConfigCancel);
  },

  componentWillUnmount: function() {
    C.ControllerStore.removeKeyListener(this.onKey);
    C.ReplayStore.removeSetUrlListener(this.onSetUrl);
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

  _forward: function(state) {
    if (state.intervalDown) {
      this.onForward();
    }
  },

  onForward: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationReplayPanelAction.forward();
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
    C.OperationReplayPanelAction.back();
  },

  _backToHead: function(state) {
    if (state.down) {
      this.onBackToHead();
    }
  },

  onBackToHead: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationReplayPanelAction.backToHead(this.props.context);
  },

  onSetUrl: function() {
    this.setState({
      urlParameters: C.ReplayStore.urlParameters()
    });

    setTimeout(function() {
      $('#url-output').select();
    }, 0);
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
    C.OperationReplayPanelAction.createUrlParameters(this.props.context);
  },

  _changeModeToSimu: function(state) {
    if (state.down) {
      this.onChangeModeToSimu();
    }
  },

  onChangeModeToSimu: function() {
    if (this.state.configuring) {
      return;
    }
    C.OperationReplayPanelAction.changeModeToSimu(this.props.context);
  },

  _configure: function(state) {
    if (state.down) {
      this.setState({
        configuring: true
      });
    }
  },

  onConfigure: function() {
    if (this.state.configuring) {
      return;
    }

    this.setState({ configuring: true });
  },

  onConfigChange: function() {
    this.setState({
      configuring: false,
      keyConfig: C.ConfigStore.keyConfig(C.Constants.Mode.Replay)
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
          <div className="operation-replay-panel">
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onBack}>&lt;</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onForward}>&gt;</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onBackToHead}>□</a>

            <div className="operation-sub-title">MODE</div>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onChangeModeToSimu}>
              {(!!this.state.before) ? '戻る' : 'Simu'}
            </a>

            <div className="operation-sub-title">TOOL</div>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onCreateUrlParameters}>URL出力</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onConfigure}>設定</a>
            <textarea id="url-output" className="url" readOnly="true" value={url} />
          </div>
          {this.state.configuring ? <ConfigPanel /> : false}
        </div>
      </div>
  }
});

