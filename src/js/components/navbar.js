"use strict";

import React from "react";
import { Navbar, NavBrand } from "react-bootstrap";

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