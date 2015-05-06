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

  onScroll: function(deltaY) {
    if (deltaY < 0) {
      this.onBack();
    } else {
      this.onForward();
    }
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

    return <div className="next-panel" onWheel={ function(e) { that.onScroll(e.deltaY); }}>
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

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      menuExpanded: false,
    });
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
    var that = this;
    return <div className="next-edit">
             {this.props.isPrev ?
               <div className="prev-index">{-this.props.index}</div>
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
               <Notices type={this.props.type} />
             </div>
           </div>
  }
});

