/**
 * @jsx React.DOM
 */
var LeftReplayPanel = React.createClass({
    render: function() {
        return <div className="left-panel">
                 <HoldReplayPanel />
                 <DescriptionReplayPanel />
               </div>
    }
});

