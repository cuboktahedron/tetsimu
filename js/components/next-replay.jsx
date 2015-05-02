/**
 * @jsx React.DOM
 */
var NextReplayPanel = React.createClass({
  getInitialState: function () {
    return {
      nexts: C.ReplayStore.nexts()
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
      nexts: C.ReplayStore.nexts()
    });
  },

  render: function() {
    return <div className="next-panel">
        <h1>NEXT</h1>
          <NextItem type={this.state.nexts[0]} index="0" />
          <NextItem type={this.state.nexts[1]} index="1"/>
          <NextItem type={this.state.nexts[2]} index="2"/>
          <NextItem type={this.state.nexts[3]} index="3"/>
          <NextItem type={this.state.nexts[4]} index="4"/>
      </div>
  }
});

