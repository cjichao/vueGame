import Sprite from "../../js/Sprite.js";
import img from "../../assets/txz/player.png";

export default class Player extends Sprite {
	constructor(playerdata, width, height) {
		super(img, width, height);
		this.playerdata = playerdata;
		this.historyStep = [];
	}
	init(ctx) {
		var that = this;
		this.img.onload = function() {
			that.render(ctx);
		}
	}
	// 记录走过的位置
	addRecord(pos){
		this.historyStep.push(pos);
	}
	back(ctx) {
		var pos = this.playerdata;
		this.playerdata = this.historyStep.pop() || pos;
	}
	render(ctx) {
		this.x = this.playerdata[0];
		this.y = this.playerdata[1];
		ctx.drawImage(
			this.img,
			this.x * this.width,
			this.y * this.width,
			this.width,
			this.height
		);
	}
}
