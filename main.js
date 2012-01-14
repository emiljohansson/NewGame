var newgame = {};

newgame.MAP_URL = "map.json";
newgame.SPRITE_MAP_URL = "sprite.json";

newgame.TILE_WIDTH = 101;
newgame.TILE_HEIGHT = 171;
newgame.TILE_THICKNESS = 40;
newgame.TILE_OFFSET = 50;

newgame.InputTypes = {
	LEFT: "left",
	UP: "up",
	RIGHT: "right",
	DOWN: "down",
	JUMP: "jump"
};

window.addEventListener("load", function () {

	// Get map

	var mapDeferred = newgame.net.getJSON(newgame.MAP_URL);

	// Get sprite map

	var spriteMapDeferred = newgame.net.getJSON(newgame.SPRITE_MAP_URL);

	// Load sprites

	var imagesDeferred = new newgame.utils.Deferred();

	spriteMapDeferred.addCallback(function (spriteMap) {

		var objectsURIs = Object.keys(spriteMap);
		var loadedObjectsNumber = 0;

		objectsURIs.forEach(function (uri) {

			spriteMap[uri].image = new Image();
			spriteMap[uri].image.addEventListener("load", function () {
				if (++loadedObjectsNumber === objectsURIs.length) {
					imagesDeferred.callback();
				}
			}, false);
			spriteMap[uri].image.addEventListener("error", function () {
				imagesDeferred.errback();
			}, false);
			spriteMap[uri].image.setAttribute("src", spriteMap[uri].url);

		});

	});

	// When all is ready, init the game

	newgame.utils.Deferred.gatherResults([
		mapDeferred,
		imagesDeferred,
		spriteMapDeferred
	]).addCallback(function () {

		var core = new newgame.Core({
				map: mapDeferred.result[0],
				entityTypes: spriteMapDeferred.result[0]
			});

		var view = new newgame.View(core, {});

		core.initPhysics();
		view.play();

	});

}, false);
