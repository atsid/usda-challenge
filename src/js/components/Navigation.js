"use strict";

import React from "react";
import { Navbar, NavBrand } from "react-bootstrap";
import debugFactory from "debug";
const debug = debugFactory('app:components:NavBar');
import ReactDOM from "react-dom";

const CHANGE_HEADER = 300;

const NavBar = React.createClass({

    getInitialState() {
        return {
            navbarShrink: false
        };
    },

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
    },

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    },

    handleScroll() {
        const navbarShrink = (window.pageYOffset || document.documentElement.scrollTop) >= CHANGE_HEADER;
        this.setState({navbarShrink});
    },

    render() {
        return (
            <nav ref="nav" className={"navbar navbar-default navbar-fixed-top" + (this.state.navbarShrink ? ' navbar-shrink' : '')}>
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand page-scroll" href="#">ATS & EchoUser USDA Innovation Challenge</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a className="page-scroll" href="#">Home</a></li>
                            <li><a className="page-scroll" href="#map">Where</a></li>
                            <li><a className="page-scroll" href="#metrics">Rainfall</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default NavBar;