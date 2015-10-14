"use strict";

import React from "react";

let NavBar = React.createClass({

    render: function() {
        return (
            <nav className={"navbar navbar-inverse navbar-fixed-top"}>
                <div className={"container-fluid"}>
                    <div className={"navbar-header"}>
                        <a className={"navbar-brand"} href={"#"}>ATS + EchoUser USDA Innovation Challenge</a>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = NavBar;