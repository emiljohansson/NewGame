(function () {
	
	var View = newgame.View = function (config) {

			this.core = config.core;

			this.createCanvas();

			this.entityViews = {};
			this.core.entitiesList.forEach(function (entity) {
				this.entityViews[entity.id] = new newgame.EntityView(this, entity);
			}, this);

			this.renderingPath = [];
			this.updateRenderingPath(true);

		};

	View.prototype.createCanvas = function () {

		var canvas = document.createElement("canvas");

		canvas.width = this.core.mapData.width * newgame.TILE_WIDTH;
		canvas.height = newgame.TILE_HEIGHT + (this.core.mapData.height - 1) * (newgame.TILE_HEIGHT - newgame.TILE_THICKNESS - newgame.TILE_OFFSET) + (this.core.mapData.height - 1) * newgame.TILE_THICKNESS;

		document.body.appendChild(canvas);

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

	};

	View.prototype.updateRenderingPath = function (flush) {

		if (flush) {
			this.renderingPath = this.core.entitiesList.map(function (entity) {
				return this.entityViews[entity.id];
			}, this);
		}

		this.renderingPath.sort(function (entityViewA, entityViewB) {
			if (entityViewA.entity.y < entityViewB.entity.y) {
				return -1;
			} else if (entityViewA.entity.y > entityViewB.entity.y) {
				return 1;
			} else {
				return entityViewA.entity.z - entityViewB.entity.z;
			}
		});

	};

	View.prototype.draw = function () {
		this.renderingPath.forEach(function (entityView) {
			entityView.draw();
		})
	};

})();
