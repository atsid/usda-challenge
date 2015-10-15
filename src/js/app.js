'use strict';

import React from 'react'
import { Router, Route, Redirect, IndexRoute } from 'react-router'
import USDAApp from "./components/usda"
import Sandbox from "./components/sandbox";
import debug from 'debug';
debug.enable('*');

(function (global) {
    React.render((
        <Router>
            <Redirect from="/" to="dashboard"/>
            <Route path="/" component={USDAApp}>
                <Route path="dashboard" component={Sandbox}/>
                <Route path="sandbox" component={Sandbox}/>
            </Route>
        </Router>
    ), document.getElementById("app"));
}(this));
