"use strict";

import React from "react";
import debugFactory from "debug";
import stateData from './states';
const debug = debugFactory('app:components:ActivitiesPerformed');
import ActivityStore from './ActivityStore';
import ActivityTile from './ActivityTile';

const activityStore = new ActivityStore();
const ActivitiesPerformedComponent = React.createClass({
    propTypes: {
        state: React.PropTypes.string.isRequired,
        year: React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return { activities: [] };
    },

    componentDidMount() {
        this.loadActivities(this.props.state, this.props.year);

    },

    componentWillReceiveProps(nextProps) {
        this.loadActivities(nextProps.state, nextProps.year);
    },

    loadActivities(state, year) {
        activityStore.getActivities(state, year).then((activities) => this.setState({activities}));
    },

    render() {
        const stateName = stateData.statesByCode[this.props.state].name;
        const activities = this.state.activities.map((activity, index) => (<ActivityTile key={`activity${index}`} activity={activity} />));
        return (
            <div>
                <h4>Percentage of land in <span>{stateName}</span> where certain activities were performed (in <span>{this.props.year}</span>)</h4>
                <div style={{display: 'flex'}}>
                    {activities.length === 0 ? 'No Activity Data Found' : activities}
                </div>
            </div>
        );
    },
});

export default ActivitiesPerformedComponent;
