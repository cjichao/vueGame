import Sprite from '../../js/Sprite.js';
import bgSrc from '../../assets/images/bg.jpg';

let width = 512;
let height = 512;
class Bg extends Sprite {
	constructor(ctx) {
		super(bgSrc, width, height);
		this.top = 0;
		this.render(ctx);
	}
	init() {

	}
	update() {
		this.top += 2;

		if (this.top >= height) this.top = 0;
	}
	render(ctx) {
		ctx.drawImage(
			this.img,
			0,
			0,
			this.width,
			this.height,
			0,
			-height + this.top,
			width,
			height
		)

		ctx.drawImage(
			this.img,
			0,
			0,
			this.width,
			this.height,
			0,
			this.top,
			width,
			height
		)
	}
}

export default Bg;
