define([
    'moment',
    '../constants/gameStates',
    '../constants/teamConstant',
], function (moment, gameStates, teams) {
    'use strict';

    function Match(homeTeam, awayTeam, timestamp /*,matchEvents*/) {
        this.clock = 0;

        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;

        this.matchEvents = [];

        this.teamEvents = {};
        this.teamEvents[teams.HOME] = {};
        this.teamEvents[teams.AWAY] = {};

        this._setKickoffTime(timestamp);
    }

    /**
     *
     * @param {Object} matchEvent
     * @private
     */
    Match.prototype.setEvent = function (matchEvent) {
        this.clock = matchEvent.time;

        this.matchEvents.push(matchEvent);

        if (!this.teamEvents[matchEvent.team][matchEvent.type]) {
            this.teamEvents[matchEvent.team][matchEvent.type] = 0;
        }
        this.teamEvents[matchEvent.team][matchEvent.type]++;
    };

    Match.prototype._setKickoffTime = function(timestamp) {
        var kickoff = moment(timestamp);
        var isWeekend = (timestamp.getDay() === 6) || (timestamp.getDay() === 0);

        if(isWeekend) {
            kickoff.hour(15).minute(0);
        } else {
            kickoff.hour(19).minute(45);
        }

        this.kickoffDate = kickoff.format('Do MMMM YYYY');
        this.kickoffTime = kickoff.format('h:mm a');
    };

    return Match;

});