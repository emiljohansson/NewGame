newgame.net = {};

newgame.net.get = function (url) {

	var deferred = new newgame.utils.Deferred();

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				deferred.callback(xhr.responseText);
			}
		}
	};

	xhr.open("GET", url);
	xhr.send();

	return deferred;

};

newgame.net.getJSON = function (url) {

	var deferred = new newgame.utils.Deferred();

	newgame.net.get(url).addCallback(function (responseText) {
		deferred.callback(JSON.parse(responseText));
	});

	return deferred;

};
