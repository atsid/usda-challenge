"use strict";

import React from "react";
import ReactDOM from "react-dom";

import debugFactory from "debug";
const debug = debugFactory('app:Info');

const InfoComponent = React.createClass({
    render() {
        return (
              <div className={"mainDescriptionContainer"}>
                <div className={"mainDescription"}>See how soil type and crop growth are related on a map of your farm land.
                      <img src="src/img/icons/soil.png"/>
                </div>
                <div className={"mainDescription"}>
                      <img src="src/img/icons/drop2.png"/>
                      Get a sense for how much your farm produces in different rainfall conditions.
                </div>
              </div>
        );
    },
});
export default InfoComponent;
