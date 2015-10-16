'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRoute } from 'react-router'
import USDAApp from "./components/usda"
import Sandbox from "./components/sandbox";
import Dashboard from "./components/dashboard";
import debug from 'debug';
debug.enable('*');

(function (global) {
    ReactDOM.render((
        <Router>
            <Redirect from="/" to="dashboard"/>
            <Route path="/" component={USDAApp}>
                <Route name="dashboard" path="dashboard" component={Dashboard}/>
                <Route name="sandbox" path="sandbox" component={Sandbox}/>
            </Route>
        </Router>
    ), document.getElementById("app"));
}(this));
