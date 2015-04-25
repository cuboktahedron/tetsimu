/**
 * @jsx React.DOM
 */
var LeftSimuPanel = React.createClass({
    render: function() {
        return <div className="left-panel">
                 <HoldSimuPanel />
                 <DescriptionSimuPanel />
               </div>
    }
});

