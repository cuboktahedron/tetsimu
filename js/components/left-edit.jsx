/**
 * @jsx React.DOM
 */
var LeftEditPanel = React.createClass({
    render: function() {
        return <div className="left-panel">
                 <HoldEditPanel />
                 <div className="description-panel" />
               </div>
    }
});

