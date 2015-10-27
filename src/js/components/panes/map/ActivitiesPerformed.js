"use strict";

import React from "react";
import debugFactory from "debug";
import stateData from './states';
const debug = debugFactory('app:components:ActivitiesPerformed');
import ActivityTile from './ActivityTile';

const ActivitiesPerformedComponent = React.createClass({
    propTypes: {
        state: React.PropTypes.string.isRequired,
        year: React.PropTypes.number.isRequired,
    },

    contextTypes: {
        activityStore: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {activities: [], yearsForState: []};
    },

    componentDidMount() {
        this.loadActivities(this.props.state, this.props.year);

    },

    componentWillReceiveProps(nextProps) {
        this.loadActivities(nextProps.state, nextProps.year);
    },

    loadActivities(state, year) {
        this.context.activityStore.getActivities(state, year)
            .then((activities) => {
                const yearsForState = this.context.activityStore.getYearsForState(state).sort((a, b) => b - a);
                this.setState({activities, yearsForState});
            });
    },

    render() {
        const stateName = stateData.statesByCode[this.props.state].name;
        const activities = this.state.activities.map((activity, index) => {
            const isLast = index === this.state.activities.length - 1;
            return (<ActivityTile key={`activity${index}`} activity={activity} isLast={isLast}/>);
        });
        const noData = `${stateName} has data available for ${this.state.yearsForState.join(', ')}`;
        return (
            <div>
                <div className="activitiesPerformedHeader">Percentage of land in <span>{stateName}</span> where certain
                    activities were performed (in <span>{this.props.year}</span>)
                </div >
                <div className="activityTileContainer">
                    {activities.length === 0 ? noData : activities}
                </div>
            </div>
        );
    },
});

export default ActivitiesPerformedComponent;
