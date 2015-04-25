/**
 * @jsx React.DOM
 */
var SimuPanel = React.createClass({
  componentWillMount: function() {
    C.SimuPanelAction.initialize(this.props.context);
  },

  componentWillReceiveProps: function(nextProps) {
    C.SimuPanelAction.initialize(nextProps.context);
  },

  render: function() {
    return <div className="main-panel">
             <LeftSimuPanel />
             <FieldSimuPanel />
             <NextSimuPanel />
             <OperationSimuPanel context={this.props.context} />
             <div className="status">
               <div className="mode">Simu</div>
               <div className="version">Ver. {C.Constants.Version}</div>
             </div>
           </div>
  }
});

