"use strict";

import React from "react";
import debugFactory from "debug";
const debug = debugFactory('app:components:Footer');

const Footer = React.createClass({
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"><a href="datasource.html" target="_blank">Data Source Credits</a></div>
                        <div className="col-md-4">
                            <span className="copyright">All content copyright &copy; ATS & EchoUser 2015</span>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-inline quicklinks">
                                <li><a href="#"> </a>
                                </li>
                                <li><a href="#"> </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
});

export default Footer;
