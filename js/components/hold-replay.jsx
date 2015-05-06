/**
 * @jsx React.DOM
 */
var HoldReplayPanel = React.createClass({
  getInitialState: function() {
    return {
      type: C.ReplayStore.holdType(),
      canHold: C.ReplayStore.canHold()
    }
  },

  componentDidMount: function() {
    C.ReplayStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    C.ReplayStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      type: C.ReplayStore.holdType(),
      canHold: C.ReplayStore.canHold()
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
