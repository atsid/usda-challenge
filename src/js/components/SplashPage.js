"use strict";

import React from "react";
import Link from "react-router/lib/Link";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import Button from "react-bootstrap/lib/Button";

let SplashPageComponent = React.createClass({

    render: function() {
        return (
            <Jumbotron style={{
                backgroundImage: 'url("src/img/trees.jpg")'
            }}>
                <h1 style={{
                        color: 'lightgrey',
                        textAlign: 'center'
                    }}>Use Data to Solve Problems</h1>
                    <Button style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <Link to="/dashboard">Go to Dashboard</Link>
                    </Button>

            </Jumbotron>
        );
    }
});

module.exports = SplashPageComponent;
