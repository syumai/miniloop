(function(global) { 

var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame || 
		window.webkitRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame ||
		window.mozCancelAnimationFrame;

function MiniLoop(mainFunc, options) {
	options = options || {};
	this.fps = options.fps || 30;
	this.status = 'stopped';
	this.functions = [];
	this.functions.push(mainFunc);
	this.animId = null;
}

MiniLoop.prototype.loop = function(timestamp) {
	this.functions.forEach(function(func) {
		func(timestamp, deltaTime);
	});
}

MiniLoop.prototype.start = function() {
	this.animId = requestAnimationFrame(this.loop.bind(this));
	this.status = 'started';
}

MiniLoop.prototype.stop = function() {
	cancelAnimationFrame(this.animId);
	this.animId = null;
	this.status = 'stopped';
}

MiniLoop.prototype.prepend = function(func) {
	this.functions.unshift(func);
	return this;
}

MiniLoop.prototype.append = function(func) {
	this.functions.push(func);
	return this;
}

if (typeof exports === 'object') {
	module.exports = MiniLoop;
} else {
	global.MiniLoop = MiniLoop;
}

})(this)
