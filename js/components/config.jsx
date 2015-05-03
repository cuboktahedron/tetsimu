/**
 * @jsx React.DOM
 */
var ConfigPanel = React.createClass({
  _KeyCombos: [],

  getInitialState: function() {
    return {
      config: C.ConfigStore.config(),
      errorMessages: []
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
    C.ControllerStore.addKeyListener(this.onKey);
  },

  componentWillUnmount: function() {
    C.ControllerStore.removeKeyListener(this.onKey);
  },

  render: function() {
    var simuKeyConfigItems = this._makeKeyConfigItems([
      { actionName: 'ハードドロップ', action: 'hardDrop'},
      { actionName: 'ソフトロップ', action: 'softDrop'},
      { actionName: '左移動', action: 'leftMove'},
      { actionName: '右移動', action: 'rightMove'},
      { actionName: '左回転', action: 'turnLeft'},
      { actionName: '右回転', action: 'turnRight'},
      { actionName: 'ホールド', action: 'hold'},
      { actionName: '１手進む', action: 'forward'},
      { actionName: '１手戻る', action: 'back'},
      { actionName: 'リトライ', action: 'retry'},
      { actionName: 'スーパーリトライ', action: 'superRetry'},
      { actionName: 'クリア', action: 'clear'},
      { actionName: 'モード切替(Replay)', action: 'changeModeToReplay'},
      { actionName: 'モード切替(Edit)', action: 'changeModeToEdit'},
      { actionName: '戻る', action: 'backToEditMode'},
      { actionName: 'URL出力', action: 'createUrlParameters'},
      { actionName: '設定', action: 'configure'}
    ], this.state.config.key.simu);

    var replayKeyConfigItems = this._makeKeyConfigItems([
      { actionName: '１手進む', action: 'forward'},
      { actionName: '１手戻る', action: 'back'},
      { actionName: '最初に戻る', action: 'backToHead'},
      { actionName: 'モード切替(Simu)', action: 'changeModeToSimu'},
      { actionName: '戻る', action: 'cancel'},
      { actionName: 'URL出力', action: 'createUrlParameters'},
      { actionName: '設定', action: 'configure'}
    ], this.state.config.key.replay);

    var editKeyConfigItems = this._makeKeyConfigItems([
      { actionName: 'Iを選択', action: 'selectTypeI'},
      { actionName: 'Jを選択', action: 'selectTypeJ'},
      { actionName: 'Lを選択', action: 'selectTypeL'},
      { actionName: 'Oを選択', action: 'selectTypeO'},
      { actionName: 'Sを選択', action: 'selectTypeS'},
      { actionName: 'Tを選択', action: 'selectTypeT'},
      { actionName: 'Zを選択', action: 'selectTypeZ'},
      { actionName: '白を選択', action: 'selectTypeOjama'},
      { actionName: '黒を選択', action: 'selectTypeNone'},
      { actionName: 'クリア', action: 'clear'},
      { actionName: 'Simu', action: 'changeModeToSimu'},
      { actionName: '戻る', action: 'cancel'},
      { actionName: 'URL出力', action: 'createUrlParameters'},
      { actionName: '設定', action: 'configure'}
    ], this.state.config.key.edit);

    return <div className="config-panel">
        <div className="inner-config-panel">
          <ModeConfig prefixId="simu" config={this.state.config.simu} title="Simu" configItems={simuKeyConfigItems} ref="simu" />
          <hr style={{clear:'both'}}/>

          <ModeConfig prefixId="replay" config={this.state.config.replay} title="Replay" configItems={replayKeyConfigItems} ref="replay" />
          <hr style={{clear:'both'}}/>

          <ModeConfig prefixId="edit" config={this.state.config.edit} title="Edit" configItems={editKeyConfigItems} ref="edit" />
          <hr style={{clear:'both'}}/>

          <div className="config-button-area">
            <button onClick={this.onSave}>保存</button>
            <button onClick={this.onCancel}>キャンセル</button>
            <button onClick={this.onInitialize}>初期設定に戻す</button>
          </div>
        </div>
        <div className="config-error">{this.state.errorMessages.map(function(message) {
          return <div>{message}</div>;
        })}</div>
      </div>
  },

  _makeKeyConfigItems: function(items, keyConfig) {
    var key
      , i, iLen
      , j, jLen
      , item
      , sck
      , token, tokens
      , keyConfigItem, keyConfigItems = [];

    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];

      keyConfigItem = $.extend({}, {
        no: i,
        shift: false,
        ctrl: false,
        cmd: false,
        action: item.action,
        actionName: item.actionName
      });

      sck = keyConfig[item.action];
      tokens = sck.split('+');
      for (j = 0, jLen = tokens.length; j < jLen; j++) {
        token = tokens[j].trim();
        switch (token) {
          case 'shift': keyConfigItem.shift = true; break;
          case 'ctrl': keyConfigItem.ctrl = true; break;
          case 'cmd': keyConfigItem.cmd = true; break;
          default: keyConfigItem.keyName = token; break;
        }
      }

      keyConfigItems.push(keyConfigItem);
    }

    return keyConfigItems;
  },

  onKey: function(state) {
    if (state.keyName === 'esc') {
      this._closeConfig(state);
    }
  },

  _closeConfig: function(state) {
    if (state.down) {
      this.onCancel();
    }
  },

  onSave: function() {
    var validationState = { errorMessages: [] }
      , config;

    config = this._buildNewConfig(validationState);
    if (config) {
      this._save(config);
    } else {
      this.setState({ errorMessages: validationState.errorMessages });
    }
  },

  _save: function(config) {
    C.ConfigAction.save(config);
    localStorage.setItem('config', JSON.stringify(config));
  },

  _buildNewConfig: function(validationState) {
    var newConfig = {}
      , simu = this.refs.simu.buildConfig()
      , replay  = this.refs.replay.buildConfig()
      , edit  = this.refs.edit.buildConfig()

    this._validateConfig("Simu", simu.keysBeforeShifted, validationState);
    this._validateConfig("Replay", replay.keysBeforeShifted, validationState);
    this._validateConfig("Edit", edit.keysBeforeShifted, validationState);

    if (validationState.errorMessages.length > 0) {
      return null;
    }

    newConfig = {
      version: C.Constants.ConfigVersion,
      key: {
        simu: simu.keys,
        replay: replay.keys,
        edit: edit.keys,
      }
    };

    return newConfig;
  },

  _validateConfig: function(name, config, validationState) {
    var p, key
      , appearedKey = {}
      , duplicatekeys = {}
      , errorMessages = [];

    for (p in config) {
      key = config[p];
      if ((key !== '') && (key in appearedKey) && !(key in duplicatekeys)) {
        duplicatekeys[key] = true;
        errorMessages.push(key + 'が重複しています。');
      }

      appearedKey[key] = true;
    }

    if (errorMessages.length > 0) {
      errorMessages = [name, '-------------------------'].concat(errorMessages).concat([' ']);
      validationState.errorMessages = validationState.errorMessages.concat(errorMessages);
      return false;
    }

    return true;
  },

  _makeComboKeyName: function(keyName) {
    var keys = [];
  },

  onCancel: function() {
    C.ConfigAction.cancel();
  },

  onInitialize: function() {
    if (confirm('初期設定に戻します。よろしいですか？')) {
      this._save(C.ConfigStore.defaultConfig());
    }
  }
});

var KeyConfigItem = React.createClass({
  _KeyDefinitions: [
    { label: '設定なし', value: '' },
    { label: 'space', value: 'space' },
    { label: 'left' , value: 'left' },
    { label: 'up'   , value: 'up' },
    { label: 'right', value: 'right' },
    { label: 'down' , value: 'down' },
    { label: '0'    , value: '0', shift: ')' },
    { label: '1'    , value: '1', shift: '!' },
    { label: '2'    , value: '2', shift: '@' },
    { label: '3'    , value: '3', shift: '#' },
    { label: '4'    , value: '4', shift: '$' },
    { label: '5'    , value: '5', shift: '%' },
    { label: '6'    , value: '6', shift: '^' },
    { label: '7'    , value: '7', shift: '&' },
    { label: '8'    , value: '8', shift: '*' },
    { label: '9'    , value: '9', shift: '(' },
    { label: 'a'    , value: 'a' },
    { label: 'b'    , value: 'b' },
    { label: 'c'    , value: 'c' },
    { label: 'd'    , value: 'd' },
    { label: 'e'    , value: 'e' },
    { label: 'f'    , value: 'f' },
    { label: 'g'    , value: 'g' },
    { label: 'h'    , value: 'h' },
    { label: 'i'    , value: 'i' },
    { label: 'j'    , value: 'j' },
    { label: 'k'    , value: 'k' },
    { label: 'l'    , value: 'l' },
    { label: 'm'    , value: 'm' },
    { label: 'n'    , value: 'n' },
    { label: 'o'    , value: 'o' },
    { label: 'p'    , value: 'p' },
    { label: 'q'    , value: 'q' },
    { label: 'r'    , value: 'r' },
    { label: 's'    , value: 's' },
    { label: 't'    , value: 't' },
    { label: 'u'    , value: 'u' },
    { label: 'v'    , value: 'v' },
    { label: 'w'    , value: 'w' },
    { label: 'x'    , value: 'x' },
    { label: 'y'    , value: 'y' },
    { label: 'z'    , value: 'z' },
    { label: 'num_0', value: 'num_0' },
    { label: 'num_1', value: 'num_1' },
    { label: 'num_2', value: 'num_2' },
    { label: 'num_3', value: 'num_3' },
    { label: 'num_4', value: 'num_4' },
    { label: 'num_5', value: 'num_5' },
    { label: 'num_6', value: 'num_6' },
    { label: 'num_7', value: 'num_7' },
    { label: 'num_8', value: 'num_8' },
    { label: 'num_9', value: 'num_9' },
    { label: ';'    , value: ';', shift: ':' },
    { label: ','    , value: ',', shift: '<' },
    { label: '.'    , value: '.', shift: '>' },
    { label: '/'    , value: '/', shift: '?' },
    { label: 'Esc'  , value: 'esc' },
  ],

  render: function() {
    var value = this.props.value
      , no = this.props.value.no
      , keyId = this.props.prefixId + '-key-' + no
      , shiftId = this.props.prefixId + '-shift-' + no
      , ctrlId = this.props.prefixId + '-ctrl-' + no
      , cmdId = this.props.prefixId + '-cmd-' + no
      , shiftChecked = value.shift
      , selectedValue = value.keyName
      , shiftDefinition;

    shiftDefinition = $.grep(this._KeyDefinitions, function(definition){
      return definition.shift === value.keyName;
    });

    if (shiftDefinition.length !== 0) {
      selectedValue = shiftDefinition[0].value;
      shiftChecked = true;
    }

    return <li className="config-item" data-no={no}>
        <div className="title">{value.actionName}</div>
        <div>
          <select id={keyId} defaultValue={selectedValue}>
            {this._KeyDefinitions.map(function(definition, y) {
              if (definition.shift == null) {
                return <option value={definition.value} key={definition.label}>{definition.label}</option>
              } else {
                return <option value={definition.value} key={definition.label} data-shift={definition.shift}>{definition.label}</option>
              }
            })}
          </select>
          <input id={shiftId} type="checkbox" defaultChecked={shiftChecked} /><label htmlFor={shiftId}>shift</label>
          <input id={ctrlId} type="checkbox" defaultChecked={value.ctrl} /><label htmlFor={ctrlId}>ctrl</label>
          <input id={cmdId} type="checkbox" defaultChecked={value.cmd} /><label htmlFor={cmdId}>cmd</label>
        </div>
      </li>
  },

  buildConfig: function() {
    var value = this.props.value
      , no = this.props.value.no
      , keyId = '#' + this.props.prefixId + '-key-' + no
      , shiftId = '#' + this.props.prefixId + '-shift-' + no
      , ctrlId = '#'+ this.props.prefixId + '-ctrl-' + no
      , cmdId = '#' + this.props.prefixId + '-cmd-' + no
      , shift = $(shiftId).is(':checked')
      , ctrl = $(ctrlId).is(':checked')
      , cmd = $(cmdId).is(':checked')
      , keyName = $(keyId).val()
      , keyWithShift = $(keyId).find('option:selected').attr('data-shift')
      , key = []
      , keyBeforeShifted = []

    if (keyName === '') {
      // 未設定
      return {
        actionName: this.props.value.action,
        key: '',
        keyBeforeShifted: ''
      };
    }

    if (ctrl) {
      key.push('ctrl');
      keyBeforeShifted.push('ctrl');
    }

    if (shift && !keyWithShift) {
      key.push('shift');
      keyBeforeShifted.push('shift');
    } else if (shift) {
      keyBeforeShifted.push('shift');
    }

    if (cmd) {
      key.push('cmd');
      keyBeforeShifted.push('cmd');
    }

    keyBeforeShifted.push(keyName);
    if (shift && !!keyWithShift) {
      key.push(keyWithShift);
    } else {
      key.push(keyName);
    }

    return {
      actionName: this.props.value.action,
      key: key.join(' + '),
      keyBeforeShifted: keyBeforeShifted.join(' + ')
    };
  }
});

var ModeConfig = React.createClass({
  render: function() {
    var that = this;
    return <div id={this.props.prefixId + '-config'}>
        <div className="config-title">{this.props.title}</div>
        <ul className="config-list">
          {this.props.configItems.map(function(keyConfigItem, i) {
            return <KeyConfigItem prefixId={that.props.prefixId} no={i} value={keyConfigItem} ref={'keyConfigItem' + i} key={keyConfigItem.action}/>
          })}
        </ul>
      </div>
  },

  buildConfig: function() {
    var i = 0
      , keyAction
      , config = {
        keys: {},
        keysBeforeShifted: {}
      };

    while (this.refs['keyConfigItem' + i] !== undefined) {
      keyAction = this.refs['keyConfigItem' + i].buildConfig();
      config.keys[keyAction.actionName] = keyAction.key;
      config.keysBeforeShifted[keyAction.actionName] = keyAction.keyBeforeShifted;
      i++;
    }

    return config;
  }
});

