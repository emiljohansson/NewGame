(function () {

	var utils = {};

	newgame.utils = utils;

    utils.Deferred = (function () {

        var Deferred = function () {
                this.state = Deferred.State.PENDING;
                this.callbacks = [];
                this.errbacks = [];
            };

        Deferred.State = {
            FAILURE: -1,
            PENDING: 0,
            SUCCESS: 1
        };

        Deferred.prototype.addCallback = function (fn, scope) {
            if (this.state === Deferred.State.PENDING) {

                this.callbacks.push({
                    fn: fn,
                    scope: scope
                });

            } else if (this.state === Deferred.State.SUCCESS) {

                fn.apply(scope, this.result);

            }

            return this;
        };

        Deferred.prototype.addErrback = function (fn, scope) {
            if (this.state === Deferred.State.PENDING) {

                this.errbacks.push({
                    fn: fn,
                    scope: scope
                });

            } else if (this.state === Deferred.State.FAILURE) {

                fn.apply(scope, this.result);

            }

            return this;
        };

        Deferred.prototype.callback = function () {
            if (this.state === Deferred.State.PENDING) {

                this.state = Deferred.State.SUCCESS;
                this.result = Array.prototype.slice.call(arguments);

                while (this.callbacks.length) {
                    var callback = this.callbacks.shift();
                    callback.fn.apply(callback.scope, this.result);
                }
            }
        };

        Deferred.prototype.errback = function () {
            if (this.state === Deferred.State.PENDING) {

                this.state = Deferred.State.FAILURE;
                this.result = Array.prototype.slice.call(arguments);

                while (this.errbacks.length) {
                    var errback = this.errbacks.shift();
                    errback.fn.apply(errback.scope, this.result);
                }
            }
        };

        Deferred.gatherResults = function (deferreds) {

        	var deferredResult = new Deferred();

        	var callbacksNumber = 0;
        	var errbacksNumber = 0;
        	
        	deferreds.forEach(function (deferred) {
        		deferred.addCallback(function () {
        			if (++callbacksNumber + errbacksNumber === deferreds.length) {
        				deferredResult.callback();
        			}
        		});
        		deferred.addErrback(function () {
        			if (++errbacksNumber + callbacksNumber === deferreds.length) {
        				deferredResult.callback();
        			}
        		});
        	});

	        return deferredResult;

        };

        return Deferred;

    })();

    utils.mixin = function (constructor, mixin) {
        for (var property in mixin) {
            constructor.prototype[property] = mixin[property];
        }
    };

    utils.ObservableMixin = {

        addEventHandler: function (type, handler, scope) {

            var handlers = this._Observable_handlers = this._Observable_handlers || {};

            handlers[type] = handlers[type] || [];

            handlers[type].push({
                fn: handler,
                scope: scope || this
            });

        },

        removeEventHandler: function (type, handler, scope) {

            scope = scope || this;

            var handlers = this._Observable_handlers;

            if (handlers && handlers[type]) {

                handlers[type] = handlers[type].filter(function (h) {
                    return (h.fn !== handler) || (h.scope !== scope);
                });

            }

        },

        fireEvent: function (type, data) {

            data = data || {};
            data.target = data.target || this;

            var stopPropagation = false;

            var handlers = this._Observable_handlers;
            if (handlers && handlers[type]) {
                handlers[type].forEach(function (handler) {
                    if (handler.fn.call(handler.scope, data) === false) {
                        stopPropagation = true;
                    }
                });
            }

            if (this.eventsBubbleTarget && !stopPropagation) {
                this.eventsBubbleTarget.fireEvent(type, data);
            }

        }

    };

})();
