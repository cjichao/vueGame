import Sprite from "../../js/Sprite.js";
import img from "../../assets/txz/player.png";

export default class Endpos extends Sprite {
	constructor(endposdata, width, height) {
		super(img, width, height);
		this.endposdata = endposdata;
	}
	init(ctx) {
		this.render(ctx);
	}
	render(ctx) {
		var that = this;
		var size = this.width;
		this.endposdata.forEach(coordinate => {
			that.x = coordinate[0];
			that.y = coordinate[1];
			ctx.fillStyle = 'skyblue';
			ctx.beginPath();
			ctx.arc(that.x * size + size / 2, that.y * size + size / 2, size / 2, 0, 2 * Math.PI);
			ctx.fill();
		});
	}
}
