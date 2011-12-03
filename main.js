var newgame = {};

newgame.MAP_URL = "map.json";

newgame.SPRITE_URL = "sprite.png";
newgame.SPRITE_MAP_URL = "sprite.json";
newgame.TILE_WIDTH = 64;
newgame.TILE_HEIGHT = 64;

window.addEventListener("load", function () {

	// Get map

	var mapDeferred = newgame.net.getJSON(newgame.MAP_URL);

	// Get sprite

	var spriteDeferred = new newgame.utils.Deferred();

	var sprite = new Image();

	sprite.addEventListener("load", function () {
		spriteDeferred.callback();
	}, false);

	sprite.setAttribute("src", newgame.SPRITE_URL);

	// Get sprite map

	var spriteMapDeferred = newgame.net.getJSON(newgame.SPRITE_MAP_URL);

	// When all is ready, init the game

	newgame.utils.Deferred.gatherResults([mapDeferred, spriteDeferred, spriteMapDeferred]).addCallback(function () {
		
		var core = new newgame.Core({
				map: mapDeferred.result[0]
			});

		var view = new newgame.View({
				core: core,
				sprite: sprite,
				spriteMap: spriteMapDeferred.result[0]
			});

	});

}, false);
