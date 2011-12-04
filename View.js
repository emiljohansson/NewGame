(function () {
	
	newgame.View = function (config) {

		this.core = config.core;

		var canvas = document.createElement("canvas");

		canvas.width = this.core.map.width * newgame.TILE_WIDTH;
		canvas.height = this.core.map.height * (newgame.TILE_HEIGHT - newgame.TILE_THICKNESS - newgame.TILE_OFFSET) + newgame.TILE_THICKNESS;

		document.body.appendChild(canvas);

		var ctx = canvas.getContext("2d");

		this.core.map.entities.forEach(function (entityConfig) {

			var entity = this.core.entityTypes[entityConfig.uri];

			ctx.drawImage(
					entity.image,
					entityConfig.x * newgame.TILE_WIDTH,
					entityConfig.y * (newgame.TILE_HEIGHT - newgame.TILE_THICKNESS - newgame.TILE_OFFSET) - entityConfig.z * newgame.TILE_THICKNESS - newgame.TILE_OFFSET);

		}, this);

		console.log("view initialized", config);

	};

})();
