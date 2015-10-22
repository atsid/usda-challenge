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
        return { activities: [], yearsForState: [] };
    },

    componentDidMount() {
        this.loadActivities(this.props.state, this.props.year);

    },

    componentWillReceiveProps(nextProps) {
        this.loadActivities(nextProps.state, nextProps.year);
    },

    loadActivities(state, year) {
        activityStore.getActivities(state, year)
            .then((activities) => {
                const yearsForState = activityStore.getYearsForState(state);
                this.setState({activities, yearsForState});
            });
    },

    render() {
        const stateName = stateData.statesByCode[this.props.state].name;
        const activities = this.state.activities.map((activity, index) => {
            const isLast = index === this.state.activities.length - 1;
            return (<ActivityTile key={`activity${index}`} activity={activity} isLast={isLast} />);
        });
        const noData = `No Activity Data Found. ${stateName} has data available for years ${this.state.yearsForState.join(', ')}`;
        return (
            <div>
                <div className="activitiesPerformedHeader">Percentage of land in <span>{stateName}</span> where certain activities were performed (in <span>{this.props.year}</span>)</div >
                <div className="activityTileContainer">
                    {activities.length === 0 ? noData : activities}
                </div>
            </div>
        );
    },
});

export default ActivitiesPerformedComponent;
