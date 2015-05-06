/**
 * @jsx React.DOM
 */
var Notices = React.createClass({
  render: function() {
    switch (this.props.type) {
      case undefined:
        return <NoticeNone />
      case C.CellType.None:
        return <NoticeNone />
      case C.CellType.I:
        return <NoticeI />
      case C.CellType.J:
        return <NoticeJ />
      case C.CellType.L:
        return <NoticeL />
      case C.CellType.O:
        return <NoticeO />
      case C.CellType.S:
        return <NoticeS />
      case C.CellType.T:
        return <NoticeT />
      case C.CellType.Z:
        return <NoticeZ />
      default:
        throw new Error('invalid type(' + this.props.type + ')');
      }
  }
});

var NoticeNone = React.createClass({
  render: function() {
    return <table className="notice-none" key="none" />
  }
});

var NoticeI = React.createClass({
  render: function() {
    return <table className="notice-i" key="i">
             <tr>
               <td className="notice-cell type-i" />
               <td className="notice-cell type-i" />
               <td className="notice-cell type-i" />
               <td className="notice-cell type-i" />
             </tr>
           </table>
  }
});

var NoticeJ = React.createClass({
  render: function() {
    return <table className="notice-j" key="j">
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
  }
});

var NoticeL = React.createClass({
  render: function() {
    return <table className="notice-l" key="l">
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
  }
});

var NoticeO = React.createClass({
  render: function() {
    return <table className="notice-o" key="o">
             <tr>
               <td className="notice-cell type-o" />
               <td className="notice-cell type-o" />
             </tr>
             <tr>
               <td className="notice-cell type-o" />
               <td className="notice-cell type-o" />
             </tr>
           </table>
  }
});

var NoticeS = React.createClass({
  render: function() {
    return <table className="notice-s" key="s">
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
  }
});

var NoticeT = React.createClass({
  render: function() {
    return <table className="notice-t" key="t">
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
  }
});

var NoticeZ = React.createClass({
  render: function() {
    return <table className="notice-z" key="z">
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
  }
});

