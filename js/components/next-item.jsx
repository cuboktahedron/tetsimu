/**
 * @jsx React.DOM
 */
var NextItem = React.createClass({
  onToggleVisible: function() {
    C.NextItemAction.toggleNextVisible(this.props.index);
  },

  render: function() {
    var that = this;

    if (this.props.visible) {
      return <div className={"next" + (this.props.fixed ? " fixed" : "")} onClick={ that.onToggleVisible }>
              <Notices type={this.props.type} />
             </div>
    } else {
      return <div className="next-hidden" onClick={ that.onToggleVisible }></div>
    }
  }
});
