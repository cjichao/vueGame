import Util from '../../js/util.js';
import Animate from "../../js/animate.js";
import enemySrc from "../../assets/images/enemy.png";

const frames = [];
const EXPLO_IMG_PREFIX = '../../assets/images/explosion';
const EXPLO_FRAME_COUNT = 19;

for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
	frames.push(require('../../assets/images/explosion' + (i + 1) + ".png"));
}

var random = Util.random;

let width = 50;
let height = 30;

class Enemy extends Animate {
	constructor(arg) {
		super(enemySrc, width, height);
		this.initExplosionAnimation();
	}
	init() {
		this.x = random(0, 462);
		this.y = -this.height;
	}
	// 预定义爆炸的帧动画
	initExplosionAnimation() {
		this.initFrames(frames);
	}
	shoot() {

	}
	update() {
		this.y += 1;
	}
	render(ctx) {
		this.drawToCanvas(ctx);
	}
}

export default Enemy;
