import Pool from './pool.js';
var instance;
// 保存数据
class Databus {
	constructor(arg) {
		if (instance) {
			return instance;
		}
		instance = this;
		this.pool = new Pool();
		this.reset();
	}

	reset() {
		this.frame = 0;
		this.score = 0;
		this.bullets = [];
		this.enemys = [];
		this.animations = [];
		this.gameOver = false;
	}
	/**
	 * 回收敌人，进入对象池
	 * 此后不进入帧循环
	 */
	removeEnemey(enemy) {
		const temp = this.enemys.shift();
		temp.visible = false;
		this.pool.recover('enemy', enemy);
	}
	/**
	 * 回收子弹，进入对象池
	 * 此后不进入帧循环
	 */
	removeBullets(bullet) {
		const temp = this.bullets.shift();
		temp.visible = false;
		this.pool.recover('bullet', bullet);
	}
}

export default Databus;
