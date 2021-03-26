import Util from '../../js/util.js';

import Bg from './bg.js';
import Enemy from './enemy.js';
import Bullet from './bullet.js';
import Hero from './hero.js';
import Databus from './databus.js';

var requestAnimationFrame = Util.requestAnimationFrame;
var cancelAnimationFrame = Util.cancelAnimationFrame;

var s_width = 512;
var s_height = 512;

class Main {
	constructor(ctx) {
		this.animateId = null;
		this.ctx = ctx;
		this.init();
	}
	init() {
		this.databus = new Databus();
		this.bg = new Bg(this.ctx);
		this.hero = new Hero();
		this._loop = this.loop.bind(this);
		this.loop();
	}
	restart() {
		this._loop();
	}
	stop() {
		cancelAnimationFrame(this.animateId);
	}
	// 生成敌人和子弹
	enemyGenerate() {
		// console.log(this.databus)
		if (this.databus.frame % 60 === 0) {
			const enemy = this.databus.pool.getItemByClass('enemy', Enemy);
			enemy.init(6);
			this.databus.enemys.push(enemy);
		}
		if (this.databus.frame % 20 === 0) {
			this.hero.shoot();
		}
	}
	// 碰撞检测
	collisionDetection() {
		var that = this;
		this.databus.bullets.forEach(function(bullet) {
			for (let i = 0, il = that.databus.enemys.length; i < il; i++) {
				const enemy = that.databus.enemys[i];
				if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
					enemy.playAnimation();
					bullet.visible = false;
					that.databus.score += 1;
					break;
				}
			}
		});
		for (let i = 0, il = this.databus.enemys.length; i < il; i++) {
			var enemy = this.databus.enemys[i];
			if (this.hero.isCollideWith(enemy)) {
				this.databus.gameOver = true;
				break;
			}
		}
	}
	update() {
		this.bg.update();
		this.databus.enemys.forEach(function(item) {
			item.update();
		});
		this.databus.bullets.forEach(function(item) {
			item.update();
		});
		// 生成敌人和子弹
		this.enemyGenerate();
		this.collisionDetection();
	}
	render(ctx) {
		if (this.databus.gameOver) return;
		this.bg.render(ctx);
		this.databus.enemys.forEach(function(item) {
			item.render(ctx);
		});
		this.databus.bullets.forEach(function(item) {
			item.render(ctx);
		});
		this.hero.render(ctx);

		this.databus.animations.forEach((ani, index) => {
			if (ani.isPlaying) {
				ani.aniRender(ctx);
			}
		})
	}
	loop() {
		this.databus.frame++;
		this.update();
		this.render(this.ctx);
		this.animateId = requestAnimationFrame(this._loop);
	}

}

export default Main;
