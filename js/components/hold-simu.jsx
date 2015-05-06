/**
 * @jsx React.DOM
 */
var HoldSimuPanel = React.createClass({
  getInitialState: function() {
    return {
      type: C.SimuStore.holdType(),
      canHold: C.SimuStore.canHold()
    }
  },

  componentDidMount: function() {
    C.SimuStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    C.SimuStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      type: C.SimuStore.holdType(),
      canHold: C.SimuStore.canHold()
    });
  },

  render: function() {
      var clazz;
      if (this.state.canHold) {
        clazz = "hold"
      } else {
        clazz = "hold cannot-hold";
      }

      return <div className="hold-panel">
               <h1>HOLD</h1>
               <div className={clazz}>
                 <Notices type={this.state.type} />
               </div>
             </div>
  }
});
