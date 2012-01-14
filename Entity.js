(function () {

	var Entity = newgame.Entity = function (core, config) {
			this.core = core;
			this.type = config.uri;
			this.id = Math.random();

			this.body = this.initPhysics(config);
		};

	Entity.prototype.initPhysics = function (config) {

		var body = new vphy.AABB({
			    width: 1,
			    height: 1,
			    depth: 1,

			    x: config.x,
			    y: config.y,
			    z: config.z,

                restitution: 0,
                density: 1,
                hardness: 1
			});

		this.core.world.add(body);

		return body;

	};

})();
