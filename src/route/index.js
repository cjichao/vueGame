import Vue from 'vue';
import VueRouter from 'vue-router';
import A from '../pages/a.vue'; // 首页
import Airwar from '../pages/airwar/airwar.vue'; // fei ji da zhan
import Txz from '../pages/txz/txz.vue'; // tui xiang zi
Vue.use(VueRouter)

var oriPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(url) {
	return oriPush.call(this, url).catch(e => e)
}


const routes = [{
	path: '/',
	name: 'Txz',
	component: Txz,
	alias: '/txz'
}, {
	path: '/airwar',
	name: 'Airwar',
	component: Airwar,
}]

const router = new VueRouter({
	routes
});

export default router;
