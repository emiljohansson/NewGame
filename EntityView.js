(function () {

	var EntityView = newgame.EntityView = function (view, entity) {
			if (view && entity) {
				this.view = view;
				this.entity = entity;
				this.update();
			}
		};

	EntityView.prototype.update = function () {
		var body = this.entity.body;
		this.x = (body.x * newgame.TILE_WIDTH) | 0;
		this.y = (body.y * (newgame.TILE_HEIGHT - newgame.TILE_OFFSET - newgame.TILE_THICKNESS) -
				body.z * newgame.TILE_THICKNESS + (this.view.core.mapData.height - 1) * newgame.TILE_THICKNESS) | 0;
	};

	EntityView.prototype.draw = function () {
		this.view.ctx.drawImage(this.view.core.entityTypes[this.entity.type].image, this.x, this.y);
	};

})();
