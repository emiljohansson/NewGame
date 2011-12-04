(function () {

	var Entity = newgame.Entity = function (config) {
			this.type = config.uri;
			this.x = config.x;
			this.y = config.y;
			this.z = config.z;
			this.id = Math.random();
		};

})();
