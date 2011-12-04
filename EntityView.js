(function () {

	var EntityView = newgame.EntityView = function (view, entity) {
			this.view = view;
			this.entity = entity;
			this.update();
		};

	EntityView.prototype.update = function () {
		this.x = this.entity.x * newgame.TILE_WIDTH,
		this.y = this.entity.y * (newgame.TILE_HEIGHT - newgame.TILE_OFFSET - newgame.TILE_THICKNESS) - this.entity.z * newgame.TILE_THICKNESS + (this.view.core.mapData.height - 1) * newgame.TILE_THICKNESS
	};

	EntityView.prototype.draw = function () {
		this.view.ctx.drawImage(this.view.core.entityTypes[this.entity.type].image, this.x, this.y);
	};

})();
