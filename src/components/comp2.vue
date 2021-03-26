<template>
	<div id='comp2'>
		{{title}}
	</div>
</template>

<script>
	export default {
		name: 'Comp2',
		props: ['title'],
		data() {
			return {
				nums: ['你', '我', '他']
			}
		},
		methods: {

		}
	}
</script>

<style scoped="scoped">
</style>
