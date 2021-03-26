class Pool {
	constructor(arg) {
		this.poolDic = {};
	}
	getPoolBySign(name) {
		return this.poolDic[name] || (this.poolDic[name] = []);
	}
	/**
	 * 根据传入的对象标识符，查询对象池
	 * 对象池为空创建新的类，否则从对象池中取
	 */
	getItemByClass(name, className) {
		const pool = this.getPoolBySign(name);

		const result = (pool.length ?
			pool.shift() :
			new className());

		return result;
	}
	/**
	 * 将对象回收到对象池
	 * 方便后续继续使用
	 */
	recover(name, instance) {
		this.getPoolBySign(name).push(instance);
	}
}

export default Pool;
