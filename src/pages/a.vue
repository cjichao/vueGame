<template>
	<div id='a'>AAAA</div>
</template>

<script>
	export default {
		name: 'A',
		data() {
			return {

			}
		},
		mounted() {
			this.$store.commit('addA')
			console.log('进入A');
			console.log(this.$store.state.countA)
		},
		methods: {}
	}
</script>

<style>
</style>
