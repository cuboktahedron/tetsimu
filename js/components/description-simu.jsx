/**
 * @jsx React.DOM
 */
var DescriptionSimuPanel = React.createClass({
  _TrickNames: (function() {
    var trickNames = {};
    trickNames[C.Constants.Trick.None] = '';
    trickNames[C.Constants.Trick.Single] = 'Single';
    trickNames[C.Constants.Trick.Double] = 'Double';
    trickNames[C.Constants.Trick.Triple] = 'Triple';
    trickNames[C.Constants.Trick.Tetris] = 'Tetris';
    trickNames[C.Constants.Trick.TSSM] = 'TSpin Single Mini';
    trickNames[C.Constants.Trick.TSS] = 'TSpin Single';
    trickNames[C.Constants.Trick.TSD] = 'TSpin Double';
    trickNames[C.Constants.Trick.TST] = 'TSpin Triple';
    trickNames[C.Constants.Trick.TSM] = 'TSpin Mini';
    trickNames[C.Constants.Trick.TS] = 'TSpin';
    trickNames[C.Constants.Trick.OverTetris] = 'Over Tetris';

    return trickNames;
  })(),

  getInitialState: function () {
    return {
      data: C.SimuStore.descriptionData()
    };
  },

  componentDidMount: function() {
    C.SimuStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    C.SimuStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      data: C.SimuStore.descriptionData()
    });
  },

  render: function() {
    var texts = []
      , data = this.state.data
      , fqtn = '';

    texts.push(<p key="ren">{'REN: ' + data.ren}</p>);

    if (data.trick !== C.Constants.Trick.None) {
      fqtn = this._TrickNames[data.trick];
      if (data.b2b) {
        fqtn = 'BtoB ' + fqtn;
      }

      texts.push(<p key="trick">{fqtn}</p>);
    }

    if (data.perfectCleared) {
      texts.push(<p key="pc">Perfect Clear</p>);
    }

    return <div className="description-panel">
             {texts}
           </div>
  }
});

