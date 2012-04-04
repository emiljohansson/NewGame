/*global newgame, vphy, alert */

(function () {

    'use strict';

    var Goals = newgame.Goals = function (core) {

            this.core = core;

            this.activateGameOverGoal();

        };

    Goals.prototype.activateGameOverGoal = function () {
        this.score = 0;
        newgame.subscribe("die", function () {
            this.score += 1;
            if (this.score === this.core.enemies.length) {
                setTimeout(function () {
                    alert("Congratulations, You Won!");
                }, 1000);
            }
        }, this);
    };

}());
