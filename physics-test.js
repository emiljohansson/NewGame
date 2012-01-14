window.addEventListener("load", function () {

	var SCALE = 20;

	var sphereDiv = document.createElement("div");
	var aabbDiv = document.createElement("div");

	document.body.appendChild(sphereDiv);
	document.body.appendChild(aabbDiv);

	var requestAnimationFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame;
	
	var world = new vphy.World();

	var sphere  = new vphy.Sphere({
		    x: 10,
		    y: 0,
		    z: 20,
		    restitution: 0
		});

	var aabb = new vphy.AABB({
		    x: 10,
		    y: 0,
		    z: 10,
		    restitution: 0
		});

	world.add(sphere);
	world.add(aabb);

	var contactsCtr = 0;
	sphere.events.on("contact", function (type, object) {
		console.log(type, object, ++contactsCtr);
	});

	sphereDiv.style.width = sphere.radius * 2 * SCALE + "px";
	sphereDiv.style.height = sphere.radius * 2 * SCALE + "px";
	sphereDiv.style.webkitBorderRadius = sphere.radius * SCALE + "px";

	aabbDiv.style.width = aabb.width * SCALE + "px";
	aabbDiv.style.height = aabb.depth * SCALE + "px";

	world.add(new vphy.LinearAccelerator({
	    x: 0,
	    y: 0,
	    z: -9.8
	}));

	world.start(Date.now() / 1000);

    var timeStep = 1 / 180;
    var wasMoving = false;
    var ctr = 0;

    (function loop (time) {

	    requestAnimationFrame(loop);

		world.step(timeStep, time / 1000);

		sphereDiv.style.bottom = (sphere.getPosition()[2] * SCALE | 0) + "px";
		aabbDiv.style.bottom = (aabb.getPosition()[2] * SCALE | 0) + aabb.depth * SCALE / 2 + "px";

		sphereDiv.style.left = (sphere.getPosition()[0] * SCALE | 0) + "px";
		aabbDiv.style.left = (aabb.getPosition()[0] * SCALE | 0) + aabb.width * SCALE / 2 + "px";

		if (wasMoving && (sphere.getVelocity()[2] === 0)) {
			if (ctr++ < 5) {
				var pos = aabb.getPosition();
				aabb.setPosition(pos[0], pos[1], pos[2] - 1);
				wasMoving = false;
			} else {
				aabb.remove();
				document.body.removeChild(aabbDiv);
			}
		} else {
			wasMoving = true;
		}

    })(Date.now());

}, false);