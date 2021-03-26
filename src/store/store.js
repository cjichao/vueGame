import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		countA: 0,
		countB: 0
	},
	mutations: {
		addA(state) {
			state.countA++
		},
		addB(state) {
			state.countB++
		}
	}
});

export default store;
