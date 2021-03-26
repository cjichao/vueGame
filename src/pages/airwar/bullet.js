import Util from '../../js/util.js';
import Sprite from '../../js/Sprite.js';
import bulletSrc from "../../assets/images/bullet.png";
import Databus from './databus.js';

const frames = [];
const EXPLO_IMG_PREFIX = '../../assets/images/explosion';
const EXPLO_FRAME_COUNT = 19;

for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
	frames.push(require('../../assets/images/explosion' + (i + 1) + ".png"));
}

var random = Util.random;

let width = 30;
let height = 15;
var databus = new Databus();
class Bullet extends Sprite {
	constructor(arg) {
		super(bulletSrc, width, height);

	}
	init(x, y) {
		this.speed = 10;
		this.visible = true;
		this.x = x;
		this.y = y;
	}
	update() {
		this.y -= this.speed;
		if (this.y < -height) {
			databus.removeBullets(this);
		}
	}
	render(ctx) {
		this.drawToCanvas(ctx);
	}
}

export default Bullet;
