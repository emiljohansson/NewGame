/*jslint browser: true */
/*global newgame, vphy */

(function () {

    'use strict';

    var HUD = newgame.HUD = function (config) {

            this.canvas = config.canvas;

            this.score = 0;

            this.buildUI();
            this.renderScore();

            newgame.subscribe("die", function () {
                this.score += 1;
                this.renderScore();
            }, this);

        };

    HUD.prototype.buildUI = function () {
        var div = document.createElement("div");
        div.className = "hud";
        div.style.width = this.canvas.width + "px";
        document.body.appendChild(div);
        this.scoreCointainer = div;
    };

    HUD.prototype.renderScore = function () {
        this.scoreCointainer.innerHTML = "Points: " + this.score;
    };

}());
