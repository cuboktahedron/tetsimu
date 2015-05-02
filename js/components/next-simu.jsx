/**
 * @jsx React.DOM
 */
var NextSimuPanel = React.createClass({
  getInitialState: function () {
    return {
      nexts: C.SimuStore.nexts(),
      nextsFixed: C.SimuStore.nextsFixed()
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
      nextsFixed: C.SimuStore.nextsFixed()
    });
  },

  render: function() {
    return <div className="next-panel">
    <h1>NEXT</h1>
    <NextItem type={this.state.nexts[0]} fixed={!!this.state.nextsFixed[0]} index="0" />
    <NextItem type={this.state.nexts[1]} fixed={!!this.state.nextsFixed[1]} index="1"/>
    <NextItem type={this.state.nexts[2]} fixed={!!this.state.nextsFixed[2]} index="2"/>
    <NextItem type={this.state.nexts[3]} fixed={!!this.state.nextsFixed[3]} index="3"/>
    <NextItem type={this.state.nexts[4]} fixed={!!this.state.nextsFixed[4]} index="4"/>
    </div>
  }
});

