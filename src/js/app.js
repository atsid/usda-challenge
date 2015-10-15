'use strict';

import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import USDAApp from "./components/usda"
import Dashboard from "./components/dashboard";

(function (global) {
    React.render((
        <Router>
            <Route path="dashboard" component={USDAApp} content={Dashboard}/>
            <Redirect from="/" to="/dashboard" />
        </Router>
    ), document.getElementById("app"));
}(this));
