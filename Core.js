(function () {
	
	newgame.Core = function (config) {

		this.map = config.map;
		this.entityTypes = config.entityTypes;

		console.log("core initialized", config);

	};

})();
