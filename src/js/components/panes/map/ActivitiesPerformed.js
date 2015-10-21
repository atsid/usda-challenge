"use strict";

import React from "react";
import {Panel} from "react-bootstrap";
import debugFactory from "debug";
import stateData from './states';
const debug = debugFactory('app:components:ActivitiesPerformed');

const ActivitiesPerformedComponent = React.createClass({
    propTypes: {
        state: React.PropTypes.string.isRequired,
        year: React.PropTypes.number.isRequired,
    },

    render() {
        const stateName = stateData.statesByCode[this.props.state].name;
        return (
            <Panel>
                <h4>Percentage of land in <span>{stateName}</span> where certain activities were performed (in <span>{this.props.year}</span>)</h4>
            </Panel>
        );
    },
});

export default ActivitiesPerformedComponent;
