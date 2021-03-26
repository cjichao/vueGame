<template>
	<div id='txz'>
		<h6>{{title}}</h6>
		<div id='choiceLevel'>
			<button v-for='(level,i) in map' class='bt' @click='choiceLevel(i)'>第{{i}}关</button>
		</div>
		<button class='bt' @click='start'>重新开始</button>
		<button class='bt' @click='stop'>停止</button>
		<button class='bt' @click='clear'>清空</button>
		<canvas id='canvas' ref='canvas'></canvas>
		<div class='bts'>
			<div class='top'>
				<button class='bt' @click="up">上</button>
			</div>
			<div class='center'>
				<button class='bt' @click="left">左</button>

				<button class='bt' @click="right">右</button>
			</div>
			<div class='bottom'>
				<button class='bt' @click="down">下</button>
			</div>


		</div>
	</div>
</template>

<script>
	import Util from '../../js/util.js';
	import Animate from '../../js/animate.js';
	import MapData from './MapData.js';
	import box from '../../assets/txz/box.png';
	import person from '../../assets/txz/person.png';
	// import _ from 'lodash';

	var random = Util.random;
	var randomColor = Util.random;
	var canvas, ctx, timer, main;
	var game_width = 500;
	var game_height = 500;
	export default {
		name: 'Txz',
		data() {
			return {
				title: 'tui xiang zi',
				isSuspend: false, //暂停
				level: 1,
				map: {},
				imgbox: null,
				imgperson: null
			}
		},
		mounted() {
			console.log('进入tui xiang zi');
			this.initCanvas();
			// 当调整窗口大小时重绘canvas
			window.onresize = () => {
				this.initCanvas();
				this.start();
			}
			this.start();
		},
		methods: {
			initMapData() {
				this.map = this._.cloneDeep(MapData);
			},
			choiceLevel(level) {
				this.level = level;
				this.start();
			},
			start() {
				this.initMapData();
				this.imgbox = new Image();
				this.imgbox.src = box;
				this.imgperson = new Image();
				this.imgperson.src = person;
				this.render();
				this.initMap();
				this.keydown();
			},
			initMap() {
				var that = this;
				this.renderWalls();
				this.imgbox.onload = function() {
					that.renderBox();
				}
				this.imgperson.onload = function() {
					that.renderPerson();
				}
			},
			render(oldPosArr) {
				this.clear(oldPosArr);
				var that = this;
				this.renderFinalPos();
				this.renderBox();
				this.renderPerson();
				this.isWin();
			},
			renderPerson() {
				ctx.drawImage(this.imgperson, this.map[this.level]
					.personPos[0] * 50, this.map[this.level]
					.personPos[1] * 50, 50, 50);
			},
			renderBox() {
				this.map[this.level].boxPos.forEach((pos, index) => {
					ctx.drawImage(this.imgbox, pos[0] * 50, pos[1] * 50, 50, 50);
				});
			},
			renderFinalPos() {
				this.map[this.level].finalPos.forEach((pos, index) => {
					ctx.fillStyle = 'skyblue';
					ctx.beginPath();
					ctx.arc(pos[0] * 50 + 25, pos[1] * 50 + 25, 20, 0, 2 * Math.PI);
					ctx.fill();
				});
			},
			renderWalls() {
				this.map[this.level].walls.forEach((pos, index) => {
					ctx.beginPath();
					ctx.fillStyle = '#e2bda0';
					ctx.fillRect(pos[0] * 50, pos[1] * 50, 50, 50);
					ctx.fill();
				});
			},
			up() {
				this.move(1, -1);
			},
			down() {
				this.move(1, 1);
			},
			left() {
				this.move(0, -1);
			},
			right() {
				this.move(0, 1);
			},
			move(posIndex, step) {
				var oldPostion = []; // 原来的位置
				var oldPos = this.map[this.level].personPos[posIndex];
				oldPostion.push([
					this.map[this.level].personPos[0],
					this.map[this.level].personPos[1]
				]);
				this.map[this.level].personPos[posIndex] = this.map[this.level].personPos[posIndex] + step;
				if (this.collisionDetection(this.map[this.level].personPos)) {
					this.map[this.level].personPos[posIndex] = oldPos;
					return;
				}
				var boxIndex;
				if ((boxIndex = this.collisionDetectionBox(this.map[this.level].personPos)) > -1) {
					var oldbox = this.map[this.level].boxPos[boxIndex][posIndex];
					this.map[this.level].boxPos[boxIndex][posIndex] = oldbox + step;
					oldPostion.push([
						this.map[this.level].boxPos[boxIndex][0],
						this.map[this.level].boxPos[boxIndex][1]
					]);
					if (this.collisionDetection(this.map[this.level].boxPos[boxIndex]) || this
						.collisionDetectionBoxToBox(
							boxIndex)) {
						this.map[this.level].personPos[posIndex] = oldPos;
						this.map[this.level].boxPos[boxIndex][posIndex] = oldbox;
						return;
					}
				}
				this.render(oldPostion);
			},
			// 碰撞检测是否箱子推箱子
			collisionDetectionBoxToBox(index) {
				var boxPos = this.map[this.level].boxPos;
				for (var i = 0, len = boxPos.length; i < len; i++) {
					if (i == index) {
						continue;
					}
					var pos = boxPos[i];
					if (pos[0] == boxPos[index][0] && pos[1] == boxPos[index][1]) {
						return true;
					}
				}
				return false;
			},
			// 碰撞检测是否在推箱子
			collisionDetectionBox(person) {
				var boxPos = this.map[this.level].boxPos;
				for (var i = 0, len = boxPos.length; i < len; i++) {
					var pos = boxPos[i];
					if (pos[0] == person[0] && pos[1] == person[1]) {
						return i;
					}
				}
				return -1;
			},
			// 碰撞检测
			collisionDetection(thing) {
				var walls = this.map[this.level].walls;
				for (var i = 0, len = walls.length; i < len; i++) {
					var pos = walls[i];
					if (pos[0] == thing[0] && pos[1] == thing[1]) {
						return true;
					}
				}
				return false;
			},
			isWin() {
				var boxPos = this.map[this.level].boxPos;
				var len = boxPos.length;
				var count = 0;
				this.map[this.level].finalPos.forEach((item) => {
					for (var i = 0; i < len; i++) {
						var pos = boxPos[i];
						if (pos[0] == item[0] && pos[1] == item[1]) {
							count++;
							break;
						}
					}
				});
				if (count == len) {
					alert('通关了');
				}
			},
			stop() {

			},
			clear(arr) {
				arr = arr || [];
				var len = arr.length;
				if (len > 0) {
					arr.forEach(pos => {
						ctx.clearRect(pos[0] * 50, pos[1] * 50, 50, 50);
					});
				} else {
					ctx.clearRect(0, 0, game_width, game_height);
				}
			},
			keydown() {
				var that = this;
				document.onkeydown = function(e) {
					e.preventDefault();
					var code = e.keyCode;
					switch (code) {
						case 37:
							// 左
							that.left();
							break;
						case 38:
							//上
							that.up();
							break;
						case 39:
							// 右
							that.right();
							break;
						case 40:
							// 下
							that.down();
							break;
						default:
							break;
					}
				}
			},
			initCanvas: function() {
				canvas = this.$refs.canvas;
				ctx = canvas.getContext('2d');
				canvas.width = game_width;
				canvas.height = game_height;
			}
		}
	}
</script>

<style scoped="scoped">
	.bts {
		width: 200px;
		height: 200px;
	}

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
