(function () {

    var Entity = newgame.LadybugCharacterEntity = function (core, config) {

            newgame.CharacterEntity.call(this, core, config);

            this.initUserInput();

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

})();
