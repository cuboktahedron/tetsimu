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
      switch (this.state.type) {
      case C.CellType.None:
        structure = <table className="hold-none" key="none" />
        break;

      case C.CellType.I:
        structure =
          <table className="hold-i" key="i">
            <tr className="hold-line">
              <td className="hold-cell type-i" />
              <td className="hold-cell type-i" />
              <td className="hold-cell type-i" />
              <td className="hold-cell type-i" />
            </tr>
          </table>
        break;

      case C.CellType.J:
        structure =
          <table className="hold-j" key="j">
            <tr className="hold-line">
              <td className="hold-cell type-j" />
              <td className="hold-cell" />
              <td className="hold-cell" />
            </tr>
            <tr className="hold-line">
              <td className="hold-cell type-j" />
              <td className="hold-cell type-j" />
              <td className="hold-cell type-j" />
            </tr>
          </table>
        break;

      case C.CellType.L:
        structure =
          <table className="hold-l" key="l">
            <tr className="hold-line">
              <td className="hold-cell" />
              <td className="hold-cell" />
              <td className="hold-cell type-l" />
            </tr>
            <tr className="hold-line">
              <td className="hold-cell type-l" />
              <td className="hold-cell type-l" />
              <td className="hold-cell type-l" />
            </tr>
          </table>
        break;

      case C.CellType.O:
        structure =
          <table className="hold-o" key="o">
            <tr className="next-line">
              <td className="next-cell type-o" />
              <td className="next-cell type-o" />
            </tr>
            <tr className="next-line">
              <td className="next-cell type-o" />
              <td className="next-cell type-o" />
            </tr>
          </table>
        break;

      case C.CellType.S:
        structure =
          <table className="hold-s" key="s">
            <tr className="hold-line">
              <td className="hold-cell" />
              <td className="hold-cell type-s" />
              <td className="hold-cell type-s" />
            </tr>
            <tr className="hold-line">
              <td className="hold-cell type-s" />
              <td className="hold-cell type-s" />
              <td className="hold-cell" />
            </tr>
          </table>
        break;

      case C.CellType.T:
        structure =
          <table className="hold-t" key="t">
            <tr className="hold-line">
              <td className="hold-cell" />
              <td className="hold-cell type-t" />
              <td className="hold-cell" />
            </tr>
            <tr className="hold-line">
              <td className="hold-cell type-t" />
              <td className="hold-cell type-t" />
              <td className="hold-cell type-t" />
            </tr>
          </table>
        break;

      case C.CellType.Z:
        structure =
          <table className="hold-z" key="z">
            <tr className="hold-line">
              <td className="hold-cell type-z" />
              <td className="hold-cell type-z" />
              <td className="hold-cell" />
            </tr>
            <tr className="hold-line">
              <td className="hold-cell" />
              <td className="hold-cell type-z" />
              <td className="hold-cell type-z" />
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

      return <div className="hold-panel">
               <h1>HOLD</h1>
               <div className={clazz}>
                 {structure}
               </div>
             </div>
    }
});
