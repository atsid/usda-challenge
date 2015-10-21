"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";
import {Panel, Jumbotron, Button, Input, Navbar, NavBrand} from "react-bootstrap";
import debugFactory from "debug";
const debug = debugFactory('app:SplashPage');

let SplashPageComponent = React.createClass({

    componentDidMount() {
        //connect google maps input
        let input = ReactDOM.findDOMNode(this.refs.searchInput);
        let searchBox = new google.maps.places.Autocomplete(input);

        //TODO: this "functions" but not with autocomplete, so the place is undefined
        debug('maps autocomplete', searchBox);
        google.maps.event.addListener(searchBox, 'place_changed', function () {
            var places = searchBox.getPlace();
            debug('place', places);
        });

    },

    render: function () {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header page-scroll">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand page-scroll" href="#page-top">ATS & EchoUser USDA Innovation Challenge</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="hidden"> <a href="#page-top"></a></li>
                                <li><a className="page-scroll" href="# ">Home</a></li>
                                <li><a className="page-scroll" href="#where ">Where</a></li>
                                <li><a className="page-scroll" href="#rainfall ">Rainfall</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <header>
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in">Harness the power of data to feed the world</div>
                            <div className="intro-heading">We make USDA data meaningful to you.</div>
                        </div>
                    </div>
                </header>

                <section id="where">
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
                </section>

                <section id="blurb">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center"/>
                        </div>
                        <h4 className="service-heading">Find your farm</h4>
                    </div>
                </section>

                <footer>
                    <div className="container">
                        <div className="row">
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
            </div>);
    },
});
export default SplashPageComponent;
