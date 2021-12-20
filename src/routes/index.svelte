<script lang="ts">
	import FileImporter from '$cmp/FileImporter.svelte'
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
	import Button from '$cmp/Button.svelte'
	import Title from '$cmp/Title.svelte'
	import Pack from '$cmp/Pack.svelte'
	import { packStore } from '$stores/Packs'
	import { theme } from '$lib/theme'
	import PackImporter from '$utils/PackImporter'
	import { toast } from '$cmp/toast';
	let packs = packStore.data

	function handleImport(event){
		try{
			const pack = PackImporter(event.detail.data)
			packStore.appendPack(pack)
		}catch(e){
			return toast.error("Error importing pack")
		}
		toast.success("Pack imported successfully")
	}

</script>
<title>
	Your packs
</title>

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
	<FileImporter on:import={handleImport} as="buffer">
		<Button value='Import pack'/>
	</FileImporter>
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
