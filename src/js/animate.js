import Sprite from './Sprite.js';
import Databus from '../pages/airwar/databus.js';

var databus = new Databus();

class Animate extends Sprite {
	constructor(imgSrc, width, height) {
		super(imgSrc, width, height);
		// 当前动画是否播放中
		this.isPlaying = false;
		// 动画是否需要循环播放
		this.loop = false;
		// 每一帧的时间间隔
		// this.interval = 1000 / 60;
		this.interval = 50;
		// 帧定时器
		this.timer = null;
		// 当前播放的帧
		this.index = -1;
		// 总帧数
		this.count = 0;
		// 帧图片集合
		this.imgList = [];
		/**
		 * 推入到全局动画池里面
		 * 便于全局绘图的时候遍历和绘制当前动画帧
		 */
		databus.animations.push(this);
	}

	initFrames(imgList) {
		imgList.forEach((imgSrc) => {
			const img = new Image();
			img.src = imgSrc;
			this.imgList.push(img);
		});
		this.count = imgList.length;
	}
	// 播放预定的帧动画
	playAnimation(index, loop) {
		// 动画播放的时候精灵图不再展示，播放帧动画的具体帧
		this.visible = false;

		this.isPlaying = true;
		this.loop = !!loop;

		this.index = index || 0;

		if (this.interval > 0 && this.count) {
			this.timer = setInterval(
				this.frameLoop.bind(this),
				this.interval
			)
		}
	}
	// 停止帧动画播放
	stop() {
		this.isPlaying = false;
		if (this.timer) clearInterval(this.timer);
	}
	// 帧遍历
	frameLoop() {
		this.index++;
		if (this.index > this.count - 1) {
			if (this.loop) {
				this.index = 0;
			} else {
				this.index--;
				this.stop();
			}
		}
	}
	aniRender(ctx) {
		ctx.drawImage(
			this.imgList[this.index],
			this.x,
			this.y
		)
	}
}

export default Animate;
