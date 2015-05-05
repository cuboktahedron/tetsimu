/**
 * @jsx React.DOM
 */
var NextItem = React.createClass({
  onToggleVisible: function() {
    C.NextItemAction.toggleNextVisible(this.props.index);
  },

  render: function() {
    var that = this
      , structure;

    switch (this.props.type) {
    case undefined:
      structure = <table className="notice-none" key="none" />
      break;

    case C.CellType.None:
      structure = <table className="notice-none" key="none" />
      break;

    case C.CellType.I:
      structure =
        <table className="notice-i" key="i">
          <tr>
            <td className="notice-cell type-i" />
            <td className="notice-cell type-i" />
            <td className="notice-cell type-i" />
            <td className="notice-cell type-i" />
          </tr>
        </table>
      break;

    case C.CellType.J:
      structure =
        <table className="notice-j" key="j">
          <tr>
            <td className="notice-cell type-j" />
            <td className="notice-cell" />
            <td className="notice-cell" />
          </tr>
          <tr>
            <td className="notice-cell type-j" />
            <td className="notice-cell type-j" />
            <td className="notice-cell type-j" />
          </tr>
        </table>
      break;

    case C.CellType.L:
      structure =
        <table className="notice-l" key="l">
          <tr>
            <td className="notice-cell" />
            <td className="notice-cell" />
            <td className="notice-cell type-l" />
          </tr>
          <tr>
            <td className="notice-cell type-l" />
            <td className="notice-cell type-l" />
            <td className="notice-cell type-l" />
          </tr>
        </table>
      break;

    case C.CellType.O:
      structure =
        <table className="notice-o" key="o">
          <tr>
            <td className="notice-cell type-o" />
            <td className="notice-cell type-o" />
          </tr>
          <tr>
            <td className="notice-cell type-o" />
            <td className="notice-cell type-o" />
          </tr>
        </table>
      break;

    case C.CellType.S:
      structure =
        <table className="notice-s" key="s">
          <tr>
            <td className="notice-cell" />
            <td className="notice-cell type-s" />
            <td className="notice-cell type-s" />
          </tr>
          <tr>
            <td className="notice-cell type-s" />
            <td className="notice-cell type-s" />
            <td className="notice-cell" />
          </tr>
        </table>
      break;

    case C.CellType.T:
      structure =
        <table className="notice-t" key="t">
          <tr>
            <td className="notice-cell" />
            <td className="notice-cell type-t" />
            <td className="notice-cell" />
          </tr>
          <tr>
            <td className="notice-cell type-t" />
            <td className="notice-cell type-t" />
            <td className="notice-cell type-t" />
          </tr>
        </table>
      break;

    case C.CellType.Z:
      structure =
        <table className="notice-z" key="z">
          <tr>
            <td className="notice-cell type-z" />
            <td className="notice-cell type-z" />
            <td className="notice-cell" />
          </tr>
          <tr>
            <td className="notice-cell" />
            <td className="notice-cell type-z" />
            <td className="notice-cell type-z" />
          </tr>
        </table>
      break;

    default:
      throw new Error('invalid type(' + this.props.type + ')');
    }

    if (this.props.visible) {
      return <div className={"next" + (this.props.fixed ? " fixed" : "")} onClick={ that.onToggleVisible }>
              {structure}
             </div>
    } else {
      return <div className="next-hidden" onClick={ that.onToggleVisible }></div>
    }
  }
});
