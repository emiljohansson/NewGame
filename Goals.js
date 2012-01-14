(function () {

	var Goals = newgame.Goals = function (core) {

			this.core = core;

			this.activateGameOverGoal();

		};

	Goals.prototype.activateGameOverGoal = function () {
		this.score = 0;
		newgame.subscribe("die", function () {
			if (++this.score === this.core.enemies.length) {
				alert("Congratulations, You Won!")
			}
		}, this);
	};

})();
