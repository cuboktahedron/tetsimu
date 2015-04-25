/**
 * @jsx React.DOM
 */
var FieldSimuPanel = React.createClass({
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
      types: C.SimuStore.fieldTypes(),
      current: C.SimuStore.current(),
      ghost: C.SimuStore.ghost()
    };
  },

  componentDidMount: function() {
    C.SimuStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    C.SimuStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      types: C.SimuStore.fieldTypes(),
      current: C.SimuStore.current(),
      ghost: C.SimuStore.ghost()
    });
  },

  render: function() {
    var that = this
      , block
      , blocks = this.state.current.blocks()
      , ghostBlocks = this.state.ghost.blocks()
      , p
      , blocksXY = {}
      , ghostBlocksXY = {};

    for (p in blocks) {
      block = blocks[p];
      blocksXY[block.x + ':' + block.y] = true;
    }

    for (p in ghostBlocks) {
      block = ghostBlocks[p];
      ghostBlocksXY[block.x + ':' + block.y] = true;
    }

    return <div className="field-panel">
        <table className="field">
          {this.state.types.map(function(row, y) {
            return <tr className="field-line" key={y}>
                {row.map(function(type, x) {
                  var xy = x + ':' + y
                    , cellClass = "field-cell";

                    if (blocksXY[xy]) {
                      return <td className={cellClass + " " + that._CellTypeClass[that.state.current.type()]} key={x} />
                    } else if (ghostBlocksXY[xy]) {
                      return <td className={cellClass + " ghost-cell " + that._CellTypeClass[that.state.current.type()]} key={'g' + x} />
                    } else {
                      return <td className={cellClass + " " + that._CellTypeClass[type]} key={x} />
                    }
                })}
              </tr>
          }).reverse()}
        </table>
      </div>
    }
});

