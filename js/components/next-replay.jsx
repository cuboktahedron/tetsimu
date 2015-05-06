/**
 * @jsx React.DOM
 */
var NextReplayPanel = React.createClass({
  getInitialState: function () {
    return {
      nexts: C.ReplayStore.nexts(),
      nextsVisibled: C.ReplayStore.nextsVisibled(),
    };
  },

  componentDidMount: function() {
    C.ReplayStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    C.ReplayStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      nexts: C.ReplayStore.nexts(),
      nextsVisibled: C.ReplayStore.nextsVisibled(),
    });
  },

  render: function() {
    return <div className="next-panel">
        <h1>NEXT</h1>
          <NextItemReplay type={this.state.nexts[0]} index="0" visible={!!this.state.nextsVisibled[0]} />
          <NextItemReplay type={this.state.nexts[1]} index="1" visible={!!this.state.nextsVisibled[1]} />
          <NextItemReplay type={this.state.nexts[2]} index="2" visible={!!this.state.nextsVisibled[2]} />
          <NextItemReplay type={this.state.nexts[3]} index="3" visible={!!this.state.nextsVisibled[3]} />
          <NextItemReplay type={this.state.nexts[4]} index="4" visible={!!this.state.nextsVisibled[4]} />
      </div>
  }
});

var NextItemReplay = React.createClass({
  onToggleVisible: function() {
    C.NextReplayAction.toggleNextVisible(this.props.index);
  },

  render: function() {
    var that = this;

    if (this.props.visible) {
      return <div className="next-replay">
               <div className={"next" + (this.props.fixed ? " fixed" : "")} onClick={ that.onToggleVisible }>
                 <Notices type={this.props.type} />
               </div>
             </div>
    } else {
      return <div className="next-replay">
               <div className="next-hidden" onClick={ that.onToggleVisible } />
             </div>
    }
  }
});


