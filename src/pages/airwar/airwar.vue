<template>
	<div id='air_war'>
		<h6>{{title}}</h6>
		<button class='bt' @click='start'>开始</button>
		<button class='bt' @click='stop'>停止</button>
		<button class='bt' @click='clear'>清空</button>
		<canvas id='canvas' ref='canvas'></canvas>
	</div>
</template>

<script>
	import Util from '../../js/util.js';
	import Animate from '../../js/animate.js';
	import Main from './main.js';

	var random = Util.random;
	var randomColor = Util.random;
	var canvas, ctx, timer, main;
	var game_width = 512;
	var game_height = 512;
	export default {
		name: 'Air war',
		data() {
			return {
				title: 'Air war',
				isSuspend: false //暂停
			}
		},
		mounted() {
			console.log('进入fei ji da zhan');
			this.initCanvas();
			// 当调整窗口大小时重绘canvas
			window.onresize = () => {
				this.initCanvas()
			}
		},
		methods: {
			start() {
				if (!main) {
					main = new Main(ctx);
				}
				if (this.isSuspend) {
					main.restart();
					this.isSuspend = false;
				}
			},
			clear() {
				this.stop();
				main = null;
				this.isSuspend = false;
				ctx.clearRect(0, 0, game_width, game_height);
			},
			stop() {
				main.stop();
				this.isSuspend = true;
			},
			initCanvas: function() {
				canvas = this.$refs.canvas;
				ctx = canvas.getContext('2d');
				// var winW = window.innerWidth;
				// var winH = window.innerHeight;
				canvas.width = game_width;
				canvas.height = game_height;
			}
		}
	}
</script>

<style scoped="scoped">
	.bt {
		border: 1px solid skyblue;
		background-color: skyblue;
		padding: 5px 10px;
		border-radius: 4px;
		color: #fff;
		margin: 10px;
		cursor: pointer;
	}
</style>
