import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './store/store.js';
import _ from 'lodash';


Vue.config.productionTip = false;
Vue.prototype._ = _;

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app');
