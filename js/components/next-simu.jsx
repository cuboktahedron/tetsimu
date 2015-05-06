/**
 * @jsx React.DOM
 */
var NextSimuPanel = React.createClass({
  getInitialState: function () {
    return {
      nexts: C.SimuStore.nexts(),
      nextsFixed: C.SimuStore.nextsFixed(),
      nextsVisibled: C.SimuStore.nextsVisibled(),
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
      nexts: C.SimuStore.nexts(),
      nextsFixed: C.SimuStore.nextsFixed(),
      nextsVisibled: C.SimuStore.nextsVisibled(),
    });
  },

  render: function() {
    return <div className="next-panel">
    <h1>NEXT</h1>
    <NextItemSimu type={this.state.nexts[0]} fixed={!!this.state.nextsFixed[0]} index="0" visible={!!this.state.nextsVisibled[0]} />
    <NextItemSimu type={this.state.nexts[1]} fixed={!!this.state.nextsFixed[1]} index="1" visible={!!this.state.nextsVisibled[1]} />
    <NextItemSimu type={this.state.nexts[2]} fixed={!!this.state.nextsFixed[2]} index="2" visible={!!this.state.nextsVisibled[2]} />
    <NextItemSimu type={this.state.nexts[3]} fixed={!!this.state.nextsFixed[3]} index="3" visible={!!this.state.nextsVisibled[3]} />
    <NextItemSimu type={this.state.nexts[4]} fixed={!!this.state.nextsFixed[4]} index="4" visible={!!this.state.nextsVisibled[4]} />
    </div>
  }
});

var NextItemSimu = React.createClass({
  onToggleVisible: function() {
    C.NextSimuAction.toggleNextVisible(this.props.index);
  },

  render: function() {
    var that = this;

    if (this.props.visible) {
      return <div className="next-simu">
               <div className={"next" + (this.props.fixed ? " fixed" : "")} onClick={ that.onToggleVisible }>
                 <Notices type={this.props.type} />
               </div>
             </div>
    } else {
      return <div className="next-simu">
               <div className="next-hidden" onClick={ that.onToggleVisible } />
             </div>
    }
  }
});

