"use strict";

import React from "react";
import Navbar from "./navbar";
import {History} from "react-router";

import debugFactory from "debug";
const debug = debugFactory('app:components:App');

let USDAApp = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
    },
    render: function() {
        return (
            <div>
                <Navbar />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = USDAApp;