/**
 * @jsx React.DOM
 */
var FieldEditPanel = React.createClass({
  _CellTypeClass: (function() {
    var cellTypeClass = {};
    cellTypeClass[C.CellType.None] = 'type-none';
    cellTypeClass[C.CellType.I] = 'type-i';
    cellTypeClass[C.CellType.J] = 'type-j';
    cellTypeClass[C.CellType.L] = 'type-l';
    cellTypeClass[C.CellType.O] = 'type-o';
    cellTypeClass[C.CellType.S] = 'type-s';
    cellTypeClass[C.CellType.T] = 'type-t';
    cellTypeClass[C.CellType.Z] = 'type-z';
    cellTypeClass[C.CellType.Ojama] = 'type-ojama';
    cellTypeClass[C.CellType.Wall] = 'type-wall';

    return cellTypeClass;
  })(),

  getInitialState: function () {
    return {
      isEditing: C.MouseStore.state().lButtonDown,
      types: C.EditStore.fieldTypes(),
    };
  },

  componentDidMount: function() {
    C.EditStore.addChangeListener(this.onChange);
    C.MouseStore.addMouseListener(this.onMouseChange);
  },

  componentWillUnmount: function() {
    C.EditStore.removeChangeListener(this.onChange);
    C.MouseStore.removeMouseListener(this.onMouseChange);
  },

  onMouseChange: function() {
    this.setState({
      isEditing: C.MouseStore.state().lButtonDown,
    });
  },

  onChange: function() {
    this.setState({
      types: C.EditStore.fieldTypes(),
    });
  },

  onBeginEdit: function(x, y) {
    if (this.state.configuring) {
      return;
    }

    C.FieldEditAction.beginEdit(x, y);
  },

  onSetCell: function(x, y) {
    if (this.state.configuring || !this.state.isEditing) {
      return;
    }

    C.FieldEditAction.setCell(x, y);
  },

  onEndEdit: function(x, y) {
    if (this.state.configuring || this.state.isEditing) {
      return;
    }

    C.FieldEditAction.endEdit(x, y);
  },

  onBuildUp: function() {
    if (this.state.configuring) {
      return;
    }

    C.FieldEditAction.buildUp();
  },

  onBuildDown: function() {
    C.FieldEditAction.buildDown();
  },

  onScroll: function(deltaY) {
    if (deltaY < 0) {
      this.onBuildUp();
    } else {
      this.onBuildDown();
    }
  },

  render: function() {
    var that = this;

    return <div className="field-edit-panel">
        <table className="field" onWheel={ function(e) { that.onScroll(e.deltaY); }}>
          {this.state.types.map(function(row, y) {
            return <tr className="field-line" key={y}>
                {row.map(function(type, x) {
                  var cellClass = "field-cell";
                    return <td className={cellClass + " " + that._CellTypeClass[type]} key={x}
                               onMouseDown={ function() { that.onBeginEdit(x, y); } }
                               onMouseOver={ function() { that.onSetCell(x, y); } }
                               onMouseUp={ function() { that.onEndEdit(); } } />
                })}
              </tr>
          }).reverse()}
        </table>
        <div className="build-blocks">
          <div className="arrow" onClick={this.onBuildUp}>▲</div>
          <div className="arrow" onClick={this.onBuildDown}>▼</div>
        </div>
      </div>
    }
});

