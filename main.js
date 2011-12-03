var newgame = {};

newgame.MAP_URL = "map.json";

newgame.SPRITE_URL = "sprite.png";
newgame.TILE_WIDTH = 64;
newgame.TILE_HEIGHT = 64;

newgame.initCanvas = function () {
	
	var canvas = document.createElement("canvas");

};

newgame.net = {};
newgame.net.get = function (url, callback) {

	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				callback(httpRequest.responseText);
			}
		}
	};

	httpRequest.open("GET", url);
	httpRequest.send();

};

window.addEventListener("load", function () {

	var sprite = new Image();

	sprite.addEventListener("load", newgame.init, false);

	sprite.setAttribute("src", newgame.SPRITE_URL);

}, false);
