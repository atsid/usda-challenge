'use strict';

import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import USDAApp from "./components/usda"
import Sandbox from "./components/sandbox";
import debug from 'debug';
debug.enable('*');

(function (global) {
    React.render((
        <Router>
            <Route path="sandbox" component={USDAApp} content={Sandbox}/>
            <Redirect from="/" to="/sandbox" />
        </Router>
    ), document.getElementById("app"));
}(this));
