"use strict";

import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import NavBrand from "react-bootstrap/lib/NavBrand";

let NavBar = React.createClass({

    render: function() {
        return (
            <Navbar inverse fixedTop>
                <NavBrand>
                    ATS + EchoUser USDA Innovation Challenge
                </NavBrand>
            </Navbar>
        );
    }
});

module.exports = NavBar;