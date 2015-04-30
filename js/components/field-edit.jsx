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
      isEditing: C.EditStore.isFieldEditing(),
      types: C.EditStore.fieldTypes(),
      selectedType: C.EditStore.selectedType(),
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
      isEditing: C.EditStore.isFieldEditing(),
      types: C.EditStore.fieldTypes(),
    });
  },

  onBeginEdit: function(x, y) {
    if (this.state.configuring) {
      return;
    }

    C.FieldEditAction.beginEdit(x, y);
  },

  onSetCell: function(x, y, type) {
    if (this.state.configuring || !this.state.isEditing) {
      return;
    }

    C.FieldEditAction.setCell(x, y, type);
  },

  onEndEdit: function(x, y) {
    if (this.state.configuring || this.state.isEditing) {
      return;
    }

    C.FieldEditAction.endEdit(x, y);
  },

  render: function() {
    var that = this;

    return <div className="field-panel">
        <table className="field">
          {this.state.types.map(function(row, y) {
            return <tr className="field-line" key={y}>
                {row.map(function(type, x) {
                  var cellClass = "field-cell";
                    return <td className={cellClass + " " + that._CellTypeClass[type]} key={x}
                               onMouseDown={ function() { that.onBeginEdit(x, y); } }
                               onMouseOver={ function() { that.onSetCell(x, y, that.state.selectedType); } }
                               onMouseUp={ function() { that.onEndEdit(); } } />
                })}
              </tr>
          }).reverse()}
        </table>
      </div>
    }
});

