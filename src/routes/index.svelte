<script lang="ts">
	import FileImporter from '$cmp/FileImporter.svelte'
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
	import Button from '$cmp/Button.svelte'
	import Title from '$cmp/Title.svelte'
	import Pack from '$cmp/Pack.svelte'
	import { packStore } from '$stores/Packs'
	let packs = packStore.data
</script>

<Title>Welcome to the Soundboard</Title>
<div class="align-left">
	<FileImporter>
		<Button value="Import Pack" />
	</FileImporter>
</div>
<Title style="margin-top: 2rem;">Your Packs</Title>
<div class="pack-wrapper">
	{#each $packs as pack}
		<Pack 
			title={pack.name}
			description={pack.description}
			image={pack.image}
		/>
	{/each}
</div>
<a href="pack/create" class="new-pack">
	Create new pack
	<div class="icon">
		<FaPlus />
	</div>
</a>

<style lang="scss">
	@import '../variables.scss';
	.align-left {
		display: flex;
		justify-content: flex-end;
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
</style>
