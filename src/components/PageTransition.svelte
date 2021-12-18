<script>
	import { fly } from 'svelte/transition'
	export let refresh = ''
    import { theme } from "$lib/theme";
	$: console.log($theme)
</script>

{#key refresh}
	<div in:fly={{ x: -50, duration: 500 }} class="page" class:dark={$theme === 'dark'}>
		<slot />
	</div>
{/key}

<style lang="scss">
    @import "../variables.scss";
    .dark{
        background-color: #181a1b;
		color: $textMain;
    }
	.page {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1rem;
	}
	@media (max-width: 650px) {
		.page {
			margin-top: 1rem;
		}
	}
</style>