<template>
	<div id="app">
		<router-link class='a' to='/'>去txz</router-link>

		<router-link class='a' to='/airwar'>去airwar</router-link>
		<router-view></router-view>
		<!-- <router-view name='b'></router-view> -->
		<button @click='changeTitle'>切换标题</button>
		<Draw @aa='fn' :title="title"></Draw>
	</div>
</template>

<script>
	import Draw from './components/draw.vue';
	import Comp2 from './components/comp2.vue';
	import util from './js/util.js';
	var {
		random
	} = util;

	export default {
		name: 'app',
		components: {
			Draw,
			Comp2
		},
		data: function() {
			return {
				title: 'some pictures',
				titles: ['some pictures', 'asf', 'haha', 'yes', 'amd yes', 'intel no']
			}
		},
		mounted() {
			// import('./js/util.js').then(res => {
			// 	console.log(res.default)
			// 	// res 即是导出的内容
			// }).catch(err => {})
			// console.log(random)
		},
		methods: {
			fn(data) {
				this.title = data[random(0, data.length - 1)];
			},
			changeTitle() {
				this.title = this.titles[random(0, this.titles.length - 1)];
			}
		}

	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	.a {
		padding: 10px;
	}

	button {
		outline: none;
	}
</style>
