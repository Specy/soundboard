<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	function submit(e) {
		e.preventDefault()
		dispatch('submit', e)
	}
</script>

<form on:submit={submit} >
    <slot/>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
