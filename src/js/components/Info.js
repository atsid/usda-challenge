"use strict";

import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:Info');

const InfoComponent = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="col-md-3 col-md-offset-3">
                    <span className="fa-stack fa-2x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-search fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Do you know your soil?</h4>
                    <p className="text-muted">See how soil type and crop growth are related on a map of your farm land.</p>
                </div>

                <div className="col-md-3">
                    <span className="fa-stack fa-2x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-tint fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Rainfall</h4>
                    <p className="text-muted">Get a sense for how much your farm can produce per year compared to detailed historical precipitation data.</p>
                </div>
            </div>
        );
    },
});
export default InfoComponent;
