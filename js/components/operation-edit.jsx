/**
 * @jsx React.DOM
 */
var OperationEditPanel = React.createClass({
  getInitialState: function() {
    return {
      before: C.EditStore.context().before,
      configuring: false,
      context: C.EditStore.context(),
      keyConfig: C.ConfigStore.keyConfig(C.Constants.Mode.Edit),
      selectedType: C.EditStore.selectedType(),
      urlParameters: C.EditStore.urlParameters()
    };
  },

  componentDidMount: function() {
    C.ControllerStore.addKeyListener(this.onKey);
    C.EditStore.addChangeListener(this.onChange);
    C.EditStore.addSetUrlListener(this.onSetUrl);
    C.ConfigStore.addChangeListener(this.onConfigChange);
    C.ConfigStore.addCancelListener(this.onConfigCancel);
  },

  componentWillUnmount: function() {
    C.ControllerStore.removeKeyListener(this.onKey);
    C.EditStore.removeChangeListener(this.onChange);
    C.EditStore.removeSetUrlListener(this.onSetUrl);
    C.ConfigStore.removeChangeListener(this.onConfigChange);
    C.ConfigStore.removeCancelListener(this.onConfigCancel);
  },

  onChange: function() {
    this.setState({
      selectedType: C.EditStore.selectedType(),
    });
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
    C.OperationEditPanelAction.changeModeToSimu();
  },

  _cancel: function(state) {
    if (state.down) {
      this.onCancel();
    }
  },

  onCancel: function() {
    if (this.state.configuring || !this.state.before) {
      return;
    }
    C.OperationEditPanelAction.cancel();
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

  onSelectType: function(type) {
    if (this.state.configuring || type === this.state.selectedType) {
      return;
    }
    C.OperationEditPanelAction.selectType(type);
  },

  _selectTypeI: function() {
    this.onSelectType(C.CellType.I);
  },

  _selectTypeJ: function() {
    this.onSelectType(C.CellType.J);
  },

  _selectTypeL: function() {
    this.onSelectType(C.CellType.L);
  },

  _selectTypeO: function() {
    this.onSelectType(C.CellType.O);
  },

  _selectTypeS: function() {
    this.onSelectType(C.CellType.S);
  },

  _selectTypeI: function() {
    this.onSelectType(C.CellType.I);
  },

  _selectTypeT: function() {
    this.onSelectType(C.CellType.T);
  },

  _selectTypeZ: function() {
    this.onSelectType(C.CellType.Z);
  },

  _selectTypeOjama: function() {
    this.onSelectType(C.CellType.Ojama);
  },

  _selectTypeNone: function() {
    this.onSelectType(C.CellType.None);
  },

  render: function() {
    var url = ''
      , st = this.state.selectedType;

    if (!!this.state.urlParameters) {
      url = location.href.split('?')[0] + '?' + this.state.urlParameters;
    }

    return <div className="operation-panel">
        <h1>OPERATION</h1>
        <div className="operation-mode-panel">
          <div className="operation-simu-panel">
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onClear}>クリア</a>

            <div className="operation-sub-title">MODE</div>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onChangeModeToSimu}>Simu</a>
            {(!!this.state.before) ?
              <a className="operation-btn" href="javascript:void(0)" onClick={this.onCancel}>戻る</a>
              : "" }

            <div className="operation-sub-title">TOOL</div>
            <div className="color-pallet">
              {this._renderColorPalletItem(C.CellType.I,     "type-i",     "I")}
              {this._renderColorPalletItem(C.CellType.J,     "type-j",     "J")}
              {this._renderColorPalletItem(C.CellType.L,     "type-l",     "L")}
              {this._renderColorPalletItem(C.CellType.O,     "type-o",     "O")}
              {this._renderColorPalletItem(C.CellType.S,     "type-s",     "S")}
              {this._renderColorPalletItem(C.CellType.T,     "type-t",     "T")}
              {this._renderColorPalletItem(C.CellType.Z,     "type-z",     "Z")}
              {this._renderColorPalletItem(C.CellType.Ojama, "type-ojama", "")}
              {this._renderColorPalletItem(C.CellType.None,  "type-none",  "")}
            </div>

            <a className="operation-btn" href="javascript:void(0)" onClick={this.onCreateUrlParameters}>URL出力</a>
            <a className="operation-btn" href="javascript:void(0)" onClick={this.onConfigure}>設定</a>
            <textarea id="url-output" className="url" readOnly="true" value={url} />
          </div>
          {this.state.configuring ? <ConfigPanel /> : false}
        </div>
      </div>
  },

  _renderColorPalletItem: function(type, typeClass, label) {
    var that = this;
    return <a href="javascript:void(0)" className={typeClass + ((this.state.selectedType == type) ? " selected": "")}
               onClick={ function() { that.onSelectType(type) } }>{label}</a>

  }

});

