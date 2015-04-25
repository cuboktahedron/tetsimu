/**
 * @jsx React.DOM
 */
var ReplayPanel = React.createClass({
  componentWillMount: function() {
    C.ReplayPanelAction.initialize(this.props.context);
  },

  render: function() {
    return <div className="main-panel">
             <LeftReplayPanel />
             <FieldReplayPanel />
             <NextReplayPanel />
             <OperationReplayPanel context={this.props.context} />
             <div className="status">
               <div className="mode">Replay</div>
               <div className="version">Ver. {C.Constants.Version}</div>
             </div>
           </div>
  }
});


