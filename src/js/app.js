'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRoute } from 'react-router'
import USDAApp from "./components/usda"
import Sandbox from "./components/sandbox";
import Dashboard from "./components/dashboard";
import SplashPage from "./components/SplashPage";
import debug from 'debug';
debug.enable('*');

(function (global) {
    ReactDOM.render((
        <Router>
            <Redirect from="/" to="/splash"/>
            <Route path="/splash" component={SplashPage}/>
            <Route path="/dashboard" component={USDAApp}>
                <IndexRoute name="dashboard" component={Dashboard}/>
            </Route>
            <Route path="/sandbox" component={USDAApp}>
                <IndexRoute name="sandbox" component={Sandbox}/>
            </Route>
        </Router>
    ), document.getElementById("app"));
}(this));
