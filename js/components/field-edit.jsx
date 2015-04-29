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
      types: C.EditStore.fieldTypes(),
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
      types: C.EditStore.fieldTypes(),
    });
  },

  render: function() {
    var that = this;

    return <div className="field-panel">
        <table className="field">
          {this.state.types.map(function(row, y) {
            return <tr className="field-line" key={y}>
                {row.map(function(type, x) {
                  var cellClass = "field-cell";

                    return <td className={cellClass + " " + that._CellTypeClass[type]} key={x} />
                })}
              </tr>
          }).reverse()}
        </table>
      </div>
    }
});

