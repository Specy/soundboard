<script lang="ts">
	import FileImporter from '$cmp/FileImporter.svelte'
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
	import Button from '$cmp/Button.svelte'
	import Title from '$cmp/Title.svelte'
	import Pack from '$cmp/Pack.svelte'
	import { packStore } from '$stores/Packs'
	import { theme } from '$lib/theme'
	let packs = packStore.data
</script>


<Title style="margin-top: 2rem;">Your Packs</Title>
<div class="pack-wrapper">
	{#each $packs as pack}
		<Pack 
			title={pack.name}
			author={pack.author}
			description={pack.description}
			image={pack.image}
			ID={pack.id}
		/>
	{/each}
</div>
<div class="pack-bottom">
	<a href="pack/create" class="new-pack" class:dark={$theme === 'dark'}>
		Create new pack
		<div class="icon">
			<FaPlus />
		</div>
	</a>

</div>


<style lang="scss">
	@import '../variables.scss';
	.pack-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.pack-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		justify-items: center;
		justify-content: center;
	}
	.new-pack{
		margin: 0.5rem;
		padding: 0.4rem;
		padding-left: 0;
		margin-left: 0;
		display: flex;
		align-items: center;
		margin-top: 1rem;
		width: fit-content;
		transition: all 0.2s;
	}
	.dark{
		color: $textMain;
	}
	.new-pack:hover{
		color: $accent;
	}
	.icon{
		width: 1rem;
		margin: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media (max-width: 650px) {
		.pack-wrapper{
			grid-template-columns: 1fr;
		}
	}
</style>
