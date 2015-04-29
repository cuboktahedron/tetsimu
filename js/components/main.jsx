/**
 * @jsx React.DOM
 */
var MainPanel = React.createClass({
  _KeyCombos: [],

  onChangeMode: function(mode, context) { this.setState({
      context: context,
      mode: mode
    });
  },

  componentWillMount: function() {
    var context;
    C.keyListener = new keypress.Listener();

    var urlParameters = C.UrlParameter.parse(location.href);
    context = C.ContextBuilder.build(urlParameters);

    this.setState({
      context: context,
      mode: context.initialMode
    });
  },

  componentDidMount: function() {
    var keys = C.Constants.KeyNames
      , i, len;

    for (i = 0, len = keys.length; i < len; i++) {
      this._KeyCombos.push((function() {
        var keyName = keys[i];
        return {
          keys: keyName,

          on_keydown: function() {
            C.ControllerAction.keydown(keyName);
            return true;
          },

          on_keyup: function() {
            C.ControllerAction.keyup(keyName);
            return true;
          }
        };
      })());
    }

    C.keyListener.register_many(this._KeyCombos);
    this._restoreConfig();

    C.SimuStore.addChangeModeListener(this.onChangeMode);
    C.ReplayStore.addChangeModeListener(this.onChangeMode);
    C.EditStore.addChangeModeListener(this.onChangeMode);
  },

  _restoreConfig: function() {
    var configJson
      , config = null
      , defaultConfig = C.ConfigStore.defaultConfig();

    // 設定情報をローカルストレージより取得（なければデフォルトを使用）
    try {
      configJson = localStorage.getItem('config');
      if (configJson != null) {
        config = JSON.parse(configJson);
        config.version = C.Constants.ConfigVersion;
        config.key.simu = $.extend({}, defaultConfig.key.simu, config.key.simu);
        config.key.replay = $.extend({}, defaultConfig.key.replay, config.key.replay);
      }
    } catch (e) {
      console.error(e);
    }

    if (!config) {
        config = C.ConfigStore.defaultConfig();
    }
    localStorage.setItem('config', JSON.stringify(config));

    C.MainPanelAction.storeConfig(config);
  },

  componentWillUnmount: function() {
    C.keyListener.unregister_many(this._KeyCombos);
    C.SimuStore.addChangeModeListener(this.onChangeMode);
    C.ReplayStore.addChangeModeListener(this.onChangeMode);
    C.EditStore.addChangeModeListener(this.onChangeMode);
  },

  render: function() {
    // IEでモード切り替え後にショートカットキーがきかなくなる問題を回避する
    setTimeout(function() {
      $('body').focus();
    }, 0);

    if (this.state.mode === C.Constants.Mode.Simu) {
      return <SimuPanel context={this.state.context} />
    }

    if (this.state.mode === C.Constants.Mode.Replay) {
      return <ReplayPanel context={this.state.context} />
    }

    if (this.state.mode === C.Constants.Mode.Edit) {
      return <EditPanel context={this.state.context} />
    }

    return <div />
  }
});

