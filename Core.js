(function () {
	
	newgame.Core = function (config) {

		this.entityTypes = config.entityTypes;
		this.mapData = config.map;
		this.entitiesList = [];

		this.mapData.entities.forEach(function (entityConfig) {
			var entity = new newgame.Entity(entityConfig);
			this.entitiesList.push(entity);
		}, this);

	};

})();
