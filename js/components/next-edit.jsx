/**
 * @jsx React.DOM
 */
var NextEditPanel = React.createClass({
  getInitialState: function () {
    return {
      index: C.EditStore.NextIndex(),
      prevs: C.EditStore.nexts().prevs,
      nexts: C.EditStore.nexts().nexts,
    };
  },

  componentDidMount: function() {
    C.EditStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    C.EditStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      index: C.EditStore.NextIndex(),
      prevs: C.EditStore.nexts().prevs,
      nexts: C.EditStore.nexts().nexts
    });
  },

  onBack: function() {
    if (this.state.index < -5) {
      return;
    }

    C.NextEditAction.back();
  },

  onForward: function() {
    C.NextEditAction.forward();
  },

  render: function() {
    var that = this
      , index = this.state.index
      , i
      , nexts = []
      , begin, end;

    if (index < 0) {
      // prevsが見えている状態(prevs + nextsの混在の可能性があるため2段階に分けて処理する）

      // prevsの処理
      begin = -(index + 5);
      if (begin < 0) {
        begin = 0;
      }
      end = -(index + 1);

      for(i = begin, count = 0; i <= end; i++, count++) {
        nexts.push(<NextEditItem type={this.state.prevs[i]} index={-(i + 1)} isPrev={true} />);
      }

      // prevsのデータ形式は表示と逆順になっているので反転
      nexts = nexts.reverse();

      // nextsの処理
      begin = 0;
      end = (index + 5 - 1);
      for(i = begin; i <= end; i++) {
        nexts.push(<NextEditItem type={this.state.nexts[i]} index={i} isPrev={false} />);
      }
    } else {
      // prevsが見えていない状態

      for(i = index; i < index + 5; i++) {
        nexts.push(<NextEditItem type={this.state.nexts[i]} index={i} isPrev={false} />);
      }
    }

    return <div className="next-panel" onWheel={
      function(e) {
        if (e.deltaY < 0) {
          that.onBack();
        } else {
          that.onForward();
        }
      }}>
        <h1>NEXT</h1>
        <a href="javascript:void(0)" className={"arrow" + ((this.state.index < -5) ? " invisible" : "")} onClick={this.onBack}>▲</a>
          {nexts}
        <a href="javascript:void(0)" className="arrow" onClick={this.onForward}>▼</a>
      </div>
  }
});

var NextEditItem = React.createClass({
  getInitialState: function() {
    return {
      menuExpanded: false,
    };
  },

  setNext: function(index) {
    C.NextEditAction.setNext(index);
  },

  onMenuExpand: function() {
    this.setState({
      menuExpanded: true
    });
  },

  onMenuContraction: function() {
    this.setState({
      menuExpanded: false
    });
  },

  onInsert: function(index) {
    C.NextEditAction.insertNext(index);
  },

  onDelete: function(index) {
    C.NextEditAction.deleteNext(index);
  },

  render: function() {
    var that = this
      , structure;

    switch (this.props.type) {
    case undefined:
      structure = <table className="next-none" key="none" />
      break;

    case C.CellType.None:
      structure = <table className="next-none" key="none" />
      break;

    case C.CellType.I:
      structure =
        <table className="next-i" key="i">
          <tr className="next-line">
            <td className="next-cell type-i" />
            <td className="next-cell type-i" />
            <td className="next-cell type-i" />
            <td className="next-cell type-i" />
          </tr>
        </table>
      break;

    case C.CellType.J:
      structure =
        <table className="next-j" key="j">
          <tr className="next-line">
            <td className="next-cell type-j" />
            <td className="next-cell" />
            <td className="next-cell" />
          </tr>
          <tr className="next-line">
            <td className="next-cell type-j" />
            <td className="next-cell type-j" />
            <td className="next-cell type-j" />
          </tr>
        </table>
      break;

    case C.CellType.L:
      structure =
        <table className="next-l" key="l">
          <tr className="next-line">
            <td className="next-cell" />
            <td className="next-cell" />
            <td className="next-cell type-l" />
          </tr>
          <tr className="next-line">
            <td className="next-cell type-l" />
            <td className="next-cell type-l" />
            <td className="next-cell type-l" />
          </tr>
        </table>
      break;

    case C.CellType.O:
      structure =
        <table className="next-o" key="o">
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
        <table className="next-s" key="s">
          <tr className="next-line">
            <td className="next-cell" />
            <td className="next-cell type-s" />
            <td className="next-cell type-s" />
          </tr>
          <tr className="next-line">
            <td className="next-cell type-s" />
            <td className="next-cell type-s" />
            <td className="next-cell" />
          </tr>
        </table>
      break;

    case C.CellType.T:
      structure =
        <table className="next-t" key="t">
          <tr className="next-line">
            <td className="next-cell" />
            <td className="next-cell type-t" />
            <td className="next-cell" />
          </tr>
          <tr className="next-line">
            <td className="next-cell type-t" />
            <td className="next-cell type-t" />
            <td className="next-cell type-t" />
          </tr>
        </table>
      break;

    case C.CellType.Z:
      structure =
        <table className="next-z" key="z">
          <tr className="next-line">
            <td className="next-cell type-z" />
            <td className="next-cell type-z" />
            <td className="next-cell" />
          </tr>
          <tr className="next-line">
            <td className="next-cell" />
            <td className="next-cell type-z" />
            <td className="next-cell type-z" />
          </tr>
        </table>
      break;

    default:
      throw new Error('invalid type(' + this.props.type + ')');
    }

    return <div className="next-edit">
             {this.props.isPrev ?
               <div className="prev-index">{this.props.index}</div>
               :
               <div className="index" onClick={this.onMenuExpand} onMouseLeave={this.onMenuContraction}>
                 {this.props.index + 1}
                 <div className={'menu' + (that.state.menuExpanded ? '' : ' none')}>
                   <div className="menuItem" onClick={ function() { that.onInsert(that.props.index); }}>＋</div>
                   <div className="menuItem" onClick={ function() { that.onDelete(that.props.index); }}>－</div>
                 </div>
               </div>
             }
             <div className="next" onClick={ function() { that.setNext(that.props.index); }} >
               {structure}
             </div>
           </div>
  }
});

