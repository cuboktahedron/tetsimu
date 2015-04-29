/**
 * @jsx React.DOM
 */
var EditPanel = React.createClass({
  componentWillMount: function() {
    C.EditPanelAction.initialize(this.props.context);
  },

  componentWillReceiveProps: function(nextProps) {
    C.EditPanelAction.initialize(nextProps.context);
  },

  render: function() {
    return <div className="main-panel">
             <LeftEditPanel />
             <FieldEditPanel />
             <NextEditPanel />
             <OperationEditPanel context={this.props.context} />
             <div className="status">
               <div className="mode">Edit</div>
               <div className="version">Ver. {C.Constants.Version}</div>
             </div>
           </div>
  }
});

