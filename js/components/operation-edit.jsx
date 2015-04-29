/**
 * @jsx React.DOM
 */
var OperationEditPanel = React.createClass({
  getInitialState: function() {
    return {
      configuring: false,
      keyConfig: C.ConfigStore.keyConfig(C.Constants.Mode.Edit),
      urlParameters: C.EditStore.urlParameters()
    };
  },

  componentDidMount: function() {
    C.ControllerStore.addKeyListener(this.onKey);
    C.EditStore.addSetUrlListener(this.onSetUrl);
    C.ConfigStore.addChangeListener(this.onConfigChange);
    C.ConfigStore.addCancelListener(this.onConfigCancel);
  },

  componentWillUnmount: function() {
    C.ControllerStore.removeKeyListener(this.onKey);
    C.EditStore.removeSetUrlListener(this.onSetUrl);
    C.ConfigStore.removeChangeListener(this.onConfigChange);
    C.ConfigStore.removeCancelListener(this.onConfigCancel);
  },

  onKey: function(state) {
    if (this.state.configuring) {
      return;
    }

    // TODO: キーコンフィグ出きるようにする
    return;
    var action = this.state.keyConfig[state.keyName];
    if (action == null) {
      return;
    }

    // キーに対応するアクションを実行
    this['_' + action](state);
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

    C.OperationEditPanelAction.clear();
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
    C.OperationEditPanelAction.back();
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
    C.OperationEditPanelAction.forward();
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
    C.OperationEditPanelAction.createUrlParameters();
  },

  onConfigure: function() {
    if (this.state.configuring) {
      return;
    }

    this.setState({ configuring: true });
  },

  onSetUrl: function() {
    this.setState({
      urlParameters: C.EditStore.urlParameters()
    });

    setTimeout(function() {
      $('#url-output').select();
    }, 0);
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
    C.OperationEditPanelAction.changeModeToSimu(this.props.context);
  },

  onConfigChange: function() {
    this.setState({
      configuring: false,
      keyConfig: C.ConfigStore.keyConfig(C.Constants.Mode.Edit)
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
            <a href="javascript:void(0)" onClick={this.onClear}>クリア</a>

            <div className="operation-sub-title">MODE</div>
            <a href="javascript:void(0)" onClick={this.onChangeModeToSimu}>Simu</a>

            <div className="operation-sub-title">TOOL</div>
            <a href="javascript:void(0)" onClick={this.onCreateUrlParameters}>URL出力</a>
            <a href="javascript:void(0)" onClick={this.onConfigure}>設定</a>
            <textarea id="url-output" className="url" readOnly="true" value={url} />
          </div>
          {this.state.configuring ? <ConfigPanel /> : false}
        </div>
      </div>
  }
});

