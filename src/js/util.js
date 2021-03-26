export default {
	random: function(min, max) {
		var num = Math.floor(Math.random() * (max - min + 1) + min);
		return num;
	},
	randomColor: function() {
		return "rgb(" + Math.floor((Math.random() * 255)) + "," +
			Math.floor((Math.random() * 255)) + "," +
			Math.floor((Math.random() * 255)) + ")"
	},
	requestAnimationFrame: (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})(),
	cancelAnimationFrame: (function() {
		return window.cancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			function(timer) {
				clearTimeout(timer);
			}
	})()
}
