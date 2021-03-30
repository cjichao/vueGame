import Sprite from "../../js/Sprite.js";
import img from "../../assets/txz/wall.jpg";

export default class Map extends Sprite{
	constructor(mapdata, width, height) {
		super(img, width, height);
		this.mapdata = mapdata;
	}
	init(ctx) {
		var that = this;
		this.img.onload = function() {
			that.render(ctx);
		}
	}
	render(ctx) {
		var that = this;
		this.mapdata.forEach(coordinate => {
			that.x = coordinate[0];
			that.y = coordinate[1];
			ctx.drawImage(
				that.img,
				that.x * that.width,
				that.y * that.width,
				that.width,
				that.height
			);
		});

	}
}
