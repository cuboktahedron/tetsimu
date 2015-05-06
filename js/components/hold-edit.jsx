/**
 * @jsx React.DOM
 */
var HoldEditPanel = React.createClass({
  getInitialState: function() {
    return {
      type: C.EditStore.holdType(),
      canHold: C.EditStore.canHold(),
    }
  },

  componentDidMount: function() {
    C.EditStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    C.EditStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      type: C.EditStore.holdType(),
      canHold: C.EditStore.canHold(),
    });
  },

  onSetHold: function() {
    C.HoldEditAction.SetHold();
  },

  render: function() {
      var clazz;
      if (this.state.canHold) {
        clazz = "hold"
      } else {
        clazz = "hold cannot-hold";
      }

      return <div className="hold-edit-panel">
               <h1>HOLD</h1>
               <div className={clazz} onClick={this.onSetHold}>
                 <Notices type={this.state.type} />
               </div>
             </div>
  }
});
