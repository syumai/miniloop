(function(global) { 

var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame || 
		window.webkitRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame ||
		window.mozCancelAnimationFrame;

function MiniLoop(mainFunc, fps) {
	this.fps = fps || 30;
	this.status = 'stopped';
	this.functions = [];
	this.functions.push(mainFunc);
	this.animId = null;
	this.prevTimestamp = 0;
}

MiniLoop.prototype.loop = function(timestamp) {
	this.prevTimestamp = timestamp;
	this.functions.forEach(function(func) {
		func(timestamp, deltaTime);
	});
	this.animId = this.loop.bind(this)(timestamp);
}

MiniLoop.prototype.start = function() {
	this.loop(0);
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

MiniLoop.prototype.setFps = function(fps) {
	this.fps = fps;
	return this;
}

if (typeof exports === 'object') {
	module.exports = MiniLoop;
} else {
	global.MiniLoop = MiniLoop;
}

})(this)
