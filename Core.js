(function () {
	
	newgame.Core = function (config) {

		this.entityTypes = config.entityTypes;
		this.mapData = config.map;
		this.entitiesMap = [];
		this.entitiesList = [];

		// parse map data to create entities list and 3d map

		var map = this.entitiesMap;
		for (var i = 0; i < this.mapData.width; i++) {
			map[i] = [];
			for (var j = 0; j < this.mapData.height; j++) {
				map[i][j] = [];
			}
		}

		this.mapData.entities.forEach(function (entityConfig) {
			var entity = new newgame.Entity(entityConfig);
			map[entityConfig.x][entityConfig.y][entityConfig.z] = entity;
			this.entitiesList.push(entity);
		}, this);

	};

})();
