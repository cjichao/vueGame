import Sprite from '../../js/Sprite.js';
import heroSrc from '../../assets/images/hero.png';
import Bullet from './bullet.js';
import Databus from './databus.js';

var width = 100;
var height = 100;
var databus = new Databus();

class Hero extends Sprite {
	constructor(arg) {
		super(heroSrc, width, height, 206, 400);
		this.init();
	}
	init() {
		this.moveSpeed = 10;
		var that = this;
		document.onkeydown = function(e) {
			e.preventDefault();
			var code = e.keyCode;
			that.update(code);
		}
	}
	shoot() {
		const bullet = databus.pool.getItemByClass('bullet', Bullet);
		bullet.init(this.x + 35, this.y);
		databus.bullets.push(bullet);
	}
	update(code) {
		switch (code) {
			case 37:
				// 左
				this.x -= this.moveSpeed;
				this.x = this.x <= 0 ? 0 : this.x;
				break;
			case 38:
				//上
				this.y -= this.moveSpeed;
				this.y = this.y <= 0 ? 0 : this.y;
				break;
			case 39:
				// 右
				this.x += this.moveSpeed;
				this.x = this.x >= 412 ? 412 : this.x;
				break;
			case 40:
				// 下
				this.y += this.moveSpeed;
				this.y = this.y >= 412 ? 412 : this.y;
				break;
			default:
				break;
		}
	}
	render(ctx) {
		this.drawToCanvas(ctx);
	}
}

export default Hero;
