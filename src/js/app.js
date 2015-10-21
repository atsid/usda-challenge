'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import SplashPage from "./components/SplashPage";
import history from './history';
import debug from 'debug';
debug.enable('*');

function initialize() {
    ReactDOM.render((
        <Router>
            <Route path="/" component={SplashPage}/>
        </Router>
    ), document.getElementById("app"));
}

window.onload = initialize;
