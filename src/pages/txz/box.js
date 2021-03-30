import Sprite from "../../js/Sprite.js";
import img from "../../assets/txz/box.png";
import over_img from "../../assets/txz/over_box.png";



export default class Box extends Sprite {
	constructor(boxdata, endPos, width, height) {
		super(img, width, height);
		this.overbox = new Sprite(over_img, width, height);
		this.boxdata = boxdata || [];
		this.historyPos = [];
		this.endPos = endPos || [];
	}
	init(ctx) {
		var that = this;
		this.img.onload = function() {
			that.render(ctx);
		};
	}
	// 记录走过的位置
	addRecord(pos) {
		this.historyPos.push(pos);
	}
	back() {
		var pos = this.boxdata;
		this.boxdata = this.historyPos.pop() || pos;
	}
	// 是否和终点重叠
	overlap() {
		var res = [];
		var boxdata = this.boxdata;
		var len1 = boxdata.length;
		var endpos = this.endPos;
		var len2 = endpos.length;
		for (var i = 0; i < len1; i++) {
			var box = boxdata[i];
			var flag = false;
			for (var j = 0; j < len2; j++) {
				var end = endpos[j];
				if (box[0] == end[0] && box[1] == end[1]) {
					res.push({
						x: box[0],
						y: box[1],
						overlap: true
					});
					flag = true;
					break;
				}
			}
			if (!flag) {
				res.push({
					x: box[0],
					y: box[1],
					overlap: false
				});
			}
		}
		return res;
	}
	render(ctx) {
		var that = this;
		var res = this.overlap();
		res.forEach(item => {
			that.x = item.x;
			that.y = item.y;
			var img = item.overlap ? that.overbox.img : that.img;
			ctx.drawImage(
				img,
				that.x * that.width,
				that.y * that.width,
				that.width,
				that.height
			);
		})
	}
}
