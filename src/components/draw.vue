<template>
	<div class="draw">
		<h3>{{title}}</h3>
		<button @click='sendToParent'>点击</button>
		<button @click='start'>开始动画</button>
		<button @click='stop'>停止动画</button>
		<canvas id='canvas' ref='canvas'></canvas>

	</div>
</template>

<script>
	// import Util from '../js/util.js';
	// import Animate from '../js/animate.js';

	// var boom = [];
	// for (var i = 1; i <= 19; i++) {
	// 	boom.push(require('../assets/images/explosion' + i + '.png'));
	// }

	// var an = new Animate();
	// an.initFrames(boom);

	// var random = Util.random;
	// var randomColor = Util.random;
	// var canvas, ctx, timer;
	export default {
		name: 'Draw',
		props: {
			title: {
				type: [String, Number]
			}
		},
		data() {
			return {
				nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			}
		},
		mounted() {
			// this.initCanvas();
			// // 当调整窗口大小时重绘canvas
			// window.onresize = () => {
			// 	this.initCanvas()
			// }
		},
		methods: {
			start() {
				// an.frameLoop();
				// an.render(ctx);
				// an.playAnimation(0, true);
				// this.animate();
			},
			animate() {
				// ctx.clearRect(0, 0, canvas.width, canvas.height)
				// an.render(ctx);
				// timer = requestAnimationFrame(this.animate.bind(this));
			},
			stop() {
				an.stop();
				// cancelAnimationFrame(timer);
			},
			sendToParent() {
				// this.$emit('aa', this.nums)
			},
			initCanvas: function() {
				// canvas = this.$refs.canvas;
				// ctx = canvas.getContext('2d');
				// var winW = window.innerWidth;
				// var winH = window.innerHeight;
				// canvas.width = winW;
				// canvas.height = winH;
			}
		}
	}
</script>

<style>
</style>
