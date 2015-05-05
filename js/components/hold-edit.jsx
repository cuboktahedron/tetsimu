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

  // TODO: render各モードで共通化できないか？
  render: function() {
    switch (this.state.type) {
      case C.CellType.None:
        structure = <table className="hold-none" key="none" />
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

      var clazz;
      if (this.state.canHold) {
        clazz = "hold"
      } else {
        clazz = "hold cannot-hold";
      }

      return <div className="hold-edit-panel">
               <h1>HOLD</h1>
               <div className={clazz} onClick={this.onSetHold}>
                 {structure}
               </div>
             </div>
  }
});
