/*global newgame, vphy */

(function () {

    'use strict';

    var Entity = newgame.CharacterEntity = function (core, config) {
            newgame.Entity.call(this, core, config);

            if (core && config) {
                this.initAI();
            }
        };

    Entity.DIE_TIMEOUT = 1500;

    Entity.prototype = new newgame.Entity();
    Entity.prototype.constructor = Entity;

    Entity.prototype.initPhysics = function (config) {

        var body = new vphy.Sphere({

                x: config.x,
                y: config.y,
                z: config.z,

                radius: 0.5,

                restitution: 0,
                density: 1,
                hardness: 1

            });

        this.core.world.add(body);

        this.core.world.add(new vphy.FrictionAccelerator({
            x: 0.99,
            y: 0.99,
            z: 1,
            bodies: [body]
        }));

        return body;

    };

    Entity.prototype.die = function () {
        if (!this.isDying) {
            var that = this;
            setTimeout(function () {
                that.body.remove();
                that.fireEvent('die');
                newgame.publish('die');
            }, Entity.DIE_TIMEOUT);
            this.isDying = Date.now();
            that.fireEvent('dying');
            newgame.publish('dying');
        }
    };

    Entity.prototype.initAI = function () {
        // just an AI stub for now...
        var that = this;
        setInterval(function () {
            that.body.accelerate(Math.random() * 200 - 100,
                    Math.random() * 200 - 100, 0);
        }, 750);
    };

}());
