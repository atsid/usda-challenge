"use strict";

import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:components:Header');

const InfoComponent = React.createClass({
    render() {
        return (
            <header>
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-lead-in">Harness the power of data to feed the world</div>
                        <div className="intro-heading">We make USDA data meaningful to you.</div>
                    </div>
                </div>
            </header>
        );
    },
});
export default InfoComponent;
