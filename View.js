(function () {

	var View = newgame.View = function (core, config) {

			this.core = core;

			this.createCanvas();

			this.entityViews = {};
			this.core.entitiesList.forEach(function (entity) {

				var entityView;

				if (entity instanceof newgame.CharacterEntity) {
					entityView = new newgame.CharacterEntityView(this, entity);
				} else {
					entityView = new newgame.EntityView(this, entity);
				}

				this.entityViews[entity.id] = entityView;

			}, this);

			this.renderingPath = [];
			this.updateRenderingPath(true);

			this.attachKeyboardHandlers();

			core.addEventHandler("die", this.deathHandler, this);

		};

	View.prototype.createCanvas = function () {

		var canvas = document.createElement("canvas");

		canvas.width = this.core.mapData.width * newgame.TILE_WIDTH;
		canvas.height = newgame.TILE_HEIGHT + (this.core.mapData.height - 1) * (newgame.TILE_HEIGHT - newgame.TILE_THICKNESS - newgame.TILE_OFFSET) + (this.core.mapData.height - 1) * newgame.TILE_THICKNESS;

		document.body.appendChild(canvas);

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

	};

	View.prototype.clearCanvas = function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	View.prototype.updateRenderingPath = function (flush) {

		if (flush) {
			this.renderingPath = this.core.entitiesList.map(function (entity) {
				return this.entityViews[entity.id];
			}, this);
		}

		this.renderingPath.sort(function (entityViewA, entityViewB) {
			if (entityViewA.entity.body.z < entityViewB.entity.body.z) {
				return -1;
			} else if (entityViewA.entity.body.z > entityViewB.entity.body.z) {
				return 1;
			} else {
				return entityViewA.entity.body.y - entityViewB.entity.body.y;
			}
		});

	};

	View.prototype.draw = function () {
		this.clearCanvas();
		this.renderingPath.forEach(function (entityView) {
			entityView.draw();
		})
	};

	View.prototype.play = function () {

		var requestAnimationFrame = window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame;

		var that = this;

	    (function loop () {
		    requestAnimationFrame(loop);
		    that.draw();
	    })();

	};

	View.prototype.attachKeyboardHandlers = function () {

		var that = this;

		var handler = function (event) {

				var action, isOn;

				switch (event.type) {
					case "keydown":
						isOn = true;
						break;
					case "keyup":
						isOn = false;
						break;
				}

				switch (event.keyCode) {
					case 37: // arrow left
					case 65: // A
						action = newgame.InputTypes.LEFT;
						break;
					case 38: // arrow up
					case 87: // W
						action = newgame.InputTypes.UP;
						break;
					case 39: // arrow right
					case 68: // D
						action = newgame.InputTypes.RIGHT;
						break;
					case 40: // arrow down
					case 83: // S
						action = newgame.InputTypes.DOWN;
						break;
					case 32: // spacebar
						action = newgame.InputTypes.JUMP;
						break;
				}

				if (action) {
					event.preventDefault();
					that.core.input(action, isOn);
				}

			};

		document.addEventListener("keydown", handler, false);
		document.addEventListener("keyup", handler, false);

	};

	View.prototype.deathHandler = function (eventData) {
		this.renderingPath.splice(this.renderingPath.indexOf(this.entityViews[eventData.target.id]), 1);
	};

})();
