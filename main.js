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

newgame.subscribe = function (channel, subscriber, scope) {

    if (typeof this._PubSubBroker_subscribers === "undefined") {
        this._PubSubBroker_subscribers = {};
    }

    var subscribers = this._PubSubBroker_subscribers;

    if (typeof subscribers[channel] === "undefined") {
        subscribers[channel] = [];
    }

    subscribers[channel].push({
        fn: subscriber,
        scope: scope || this
    });

};

newgame.publish = function (channel, message) {

    var subscribers = this._PubSubBroker_subscribers;
    message && (message._channel = channel);

    if (typeof subscribers !== "undefined") {

        var channels = Object.keys(subscribers).filter(function (key) {
                if (key[key.length - 1] === "/") {
                    return channel.indexOf(key) === 0;
                } else {
                    return channel === key;
                }
            });

        channels.forEach(function (channel) {
            subscribers[channel].forEach(function (subscriber) {
                subscriber.fn.call(subscriber.scope, message);
            });
        });

    }

};

newgame.unsubscribe = function (channel, subscriber, scope) {

    var subscribers = this._PubSubBroker_subscribers;

    if (typeof subscribers[channel] !== "undefined") {
        scope = scope || this;
        subscribers[channel] = subscribers[channel].filter(function (sub) {
            return !(sub.fn === subscriber && scope === sub.scope);
        });
    }

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

		var hud = new newgame.HUD({
				canvas: view.canvas
			});

		var goals = new newgame.Goals(core);

		var soundManager = new newgame.SoundManager();

	});

}, false);
