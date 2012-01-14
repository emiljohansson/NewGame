(function () {

    var Entity = newgame.LadybugCharacterEntity = function (core, config) {

            newgame.CharacterEntity.call(this, core, config);

            this.initUserInput();
            this.initKillingMechanism();

        };

    Entity.prototype = new newgame.CharacterEntity;
    Entity.prototype.constructor = Entity;

    Entity.prototype.initUserInput = function () {

        var that = this;
        var body = this.body;

        this.core.world.add({
            type: vphy.types.ACCELERATOR,
            perform: function () {
                if (that.core.inputs[newgame.InputTypes.RIGHT]) body.accelerate(3, 0, 0);
                if (that.core.inputs[newgame.InputTypes.LEFT])  body.accelerate(-3, 0, 0);
                if (that.core.inputs[newgame.InputTypes.UP])    body.accelerate(0, -3, 0);
                if (that.core.inputs[newgame.InputTypes.DOWN])  body.accelerate(0, 3, 0);
                if (that.core.inputs[newgame.InputTypes.JUMP]) {
                    body.accelerate(0, 0, 1280);
                    that.core.inputs[newgame.InputTypes.JUMP] = false;
                }
            }
        });

    };

    Entity.prototype.initKillingMechanism = function () {

        var that = this;
        var body = this.body;
        
        body.events.on("contact", function (eventType, contactedBody) {
            if (contactedBody instanceof vphy.Sphere) {
                that.core.enemies.forEach(function (entity) {
                    if (entity.body === contactedBody) {
                        if (body.z - contactedBody.z > 0.75) {
                            entity.die();
                        } else {
                            // TODO: player gets hit
                        }
                    }
                });
            }
        });

    };

    Entity.prototype.initAI = function () {}; // empty fn will disable AI // TODO: make a mixin/plugin?

})();
