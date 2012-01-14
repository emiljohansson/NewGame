(function () {

    var EntityView = newgame.CharacterEntityView = function (view, entity) {
            newgame.EntityView.call(this, view, entity);
        };

    EntityView.prototype = new newgame.EntityView;
    EntityView.prototype.constructor = EntityView;

    EntityView.prototype.draw = function () {
        this.update();
        if (this.entity.isDying) {
	        this.view.ctx.drawImage(this.view.core.entityTypes["Selector"].image, this.x, this.y);
	        this.view.ctx.globalAlpha = 1 - ((Date.now() - this.entity.isDying) / newgame.CharacterEntity.DIE_TIMEOUT);
        }
        newgame.EntityView.prototype.draw.call(this);
        if (this.entity.isDying) {
			this.view.ctx.globalAlpha = 1;
        }
    };

})();
