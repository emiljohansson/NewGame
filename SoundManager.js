/*global newgame, vphy, Audio */

(function () {

    'use strict';

    var SoundManager = newgame.SoundManager = function () {

            this.dyingSound = new Audio();
            this.dyingSound.src = "3GS_HitNorm.mp3";

            this.dieSound = new Audio();
            this.dieSound.src = "3GS_HitPerfect.mp3";

            newgame.subscribe("dying", function () {
                this.dyingSound.play();
            }, this);
            newgame.subscribe("die", function () {
                this.dieSound.play();
            }, this);

        };

}());
