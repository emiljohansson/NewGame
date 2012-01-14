(function () {

    var EntityView = newgame.CharacterEntityView = function (view, entity) {
            newgame.EntityView.call(this, view, entity);
        };

    EntityView.prototype = new newgame.EntityView;
    EntityView.prototype.constructor = EntityView;

    EntityView.prototype.draw = function () {
        this.update();
        newgame.EntityView.prototype.draw.call(this);
    };

})();
