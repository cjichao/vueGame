<template>
	<div id='txz'>
		<h6>{{title}}</h6>
		<div id='choiceLevel'>
			<button v-for='(level,i) in map' class='bt' @click='choiceLevel(i)'>第{{i}}关</button>
		</div>
		<button class='bt' @click='start'>重新开始</button>
		<button class='bt' @click='stop'>停止</button>
		<button class='bt' @click='clear'>清空</button>
		<button class='bt' @click='back'>回退</button>
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
	import Map from './map.js';
	import Box from './box.js';
	import Player from './player.js';
	import Endpos from './endpos.js';

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
				size: 50
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
				this.size = this.map[this.level].size || 50;
				this.mapObj = new Map(this.map[this.level].walls, this.size, this.size);
				this.boxObj = new Box(this.map[this.level].boxPos,this.map[this.level].finalPos, this.size, this.size);
				this.player = new Player(this.map[this.level].personPos, this.size, this.size);
				this.endpos = new Endpos(this.map[this.level].finalPos, this.size, this.size);
			},
			choiceLevel(level) {
				this.level = level;
				this.size = this.map[this.level].size || 50;
				this.start();
			},
			start() {
				this.initMapData();
				this.render();
				this.initMap();
				this.keydown();
			},
			back() {
				this.player.back();
				this.boxObj.back();
				this.render(ctx);
			},
			initMap() {
				var that = this;
				this.mapObj.init(ctx);
				this.endpos.init(ctx);
				this.boxObj.init(ctx);
				this.player.init(ctx);
			},
			render(oldPosArr) {
				this.clear(oldPosArr);
				this.mapObj.render(ctx);
				this.endpos.render(ctx);
				this.boxObj.render(ctx);
				this.player.render(ctx);
				this.isWin();
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
				var playerOldPos = [this.player.playerdata[0], this.player.playerdata[1]];
				var oldPos = this.player.playerdata[posIndex];
				this.player.playerdata[posIndex] = this.player.playerdata[posIndex] + step;
				if (this.collisionDetection(this.player.playerdata)) {
					this.player.playerdata[posIndex] = oldPos;
					return;
				}
				var boxIndex;
				var oldBoxPos = this._.cloneDeep(this.boxObj.boxdata);
				if ((boxIndex = this.collisionDetectionBox(this.player.playerdata)) > -1) {
					var oldbox = this.boxObj.boxdata[boxIndex][posIndex];
					this.boxObj.boxdata[boxIndex][posIndex] = oldbox + step;
					if (this.collisionDetection(this.boxObj.boxdata[boxIndex]) || this
						.collisionDetectionBoxToBox(
							boxIndex)) {
						this.player.playerdata[posIndex] = oldPos;
						this.boxObj.boxdata[boxIndex][posIndex] = oldbox;
						return;
					}
				}
				this.boxObj.addRecord(oldBoxPos);
				this.player.addRecord(playerOldPos);
				this.render();
			},
			// 碰撞检测是否箱子推箱子
			collisionDetectionBoxToBox(index) {
				var boxPos = this.boxObj.boxdata;
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
				var boxPos = this.boxObj.boxdata;
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
				var walls = this.mapObj.mapdata;
				for (var i = 0, len = walls.length; i < len; i++) {
					var pos = walls[i];
					if (pos[0] == thing[0] && pos[1] == thing[1]) {
						return true;
					}
				}
				return false;
			},
			isWin() {
				var boxPos = this.boxObj.boxdata;
				var len = boxPos.length;
				var count = 0;
				this.endpos.endposdata.forEach((item) => {
					for (var i = 0; i < len; i++) {
						var pos = boxPos[i];
						if (pos[0] == item[0] && pos[1] == item[1]) {
							count++;
							break;
						}
					}
				});
				if (count == len) {
					console.log('通关了');
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
