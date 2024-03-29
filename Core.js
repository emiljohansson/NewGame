/*global newgame, vphy */

(function () {

    'use strict';

    var PHYSICS_PRECISION = 1 / 180,
        PHYSICS_UPDATE_INTERVAL = 30;

    newgame.Core = function (config) {

        this.entityTypes = config.entityTypes;
        this.mapData = config.map;

        this.entitiesList = [];
        this.ladybug = null;
        this.enemies = [];

        this.world = this.initPhysics();

        this.inputs = {};

        this.mapData.entities.forEach(function (entityConfig) {

            var entity;

            switch (entityConfig.uri) {
            case "EnemyBug":
                entity = new newgame.LadybugCharacterEntity(this, entityConfig);
                this.ladybug = entity;
                break;
            case "CharacterBoy":
            case "CharacterCatGirl":
            case "CharacterHornGirl":
            case "CharacterPinkGirl":
            case "CharacterPrincessGirl":
                entity = new newgame.CharacterEntity(this, entityConfig);
                this.enemies.push(entity);
                break;
            default:
                entity = new newgame.Entity(this, entityConfig);
            }

            this.entitiesList.push(entity);

        }, this);

        this.addEventHandler("die", this.deathHandler, this);

    };

    newgame.utils.mixin(newgame.Core, newgame.utils.ObservableMixin);

    newgame.Core.prototype.initPhysics = function () {

        var world = new vphy.World();

        world.start(Date.now() / 1000);

        world.add(new vphy.LinearAccelerator({
            x: 0,
            y: 0,
            z: -9.8
        }));

        setInterval(function () {
            world.step(PHYSICS_PRECISION, Date.now() / 1000);
        }, PHYSICS_UPDATE_INTERVAL);

        return world;

    };

    newgame.Core.prototype.input = function (action, isOn) {
        this.inputs[action] = isOn;
    };

    newgame.Core.prototype.deathHandler = function (eventData) {
        this.entitiesList.splice(this.entitiesList.indexOf(eventData.target), 1);
    };

}());
