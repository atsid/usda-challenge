"use strict";

import React from "react";
import Navbar from "./navbar";

let USDAApp = React.createClass({
    propTypes: {
        route: React.PropTypes.object.isRequired
    },

    render: function() {
        var ContentComponent = this.props.route.content;
        return (
            <div>
                <Navbar />
                <div>
                    <ContentComponent/>
                </div>
            </div>
        );
    }
});

module.exports = USDAApp;