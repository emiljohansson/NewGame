(function () {

    var DIE_TIMEOUT = 500;

    var Entity = newgame.CharacterEntity = function (core, config) {
            newgame.Entity.call(this, core, config);
        };

    Entity.prototype = new newgame.Entity;
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
            }, DIE_TIMEOUT);
            this.isDying = true;
        }
    };

})();
