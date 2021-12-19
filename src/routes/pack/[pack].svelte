<script>
	import { page } from '$app/stores'
	import Title from '$cmp/Title.svelte'
	import { packStore } from '$stores/Packs'
	const ID = $page.params.pack
	const pack = packStore.get(ID)
</script>

<div class="pack-top">
	<div class="pack-img" >
        <img src={pack.image} alt={pack.name} />
    </div>
	<div>
		<Title>
			{pack.name}
		</Title>
		<div>
			{pack.description}
		</div>
	</div>
</div>

<style lang="scss">
	.pack-top {
		display: flex;
		.pack-img {
			margin: 1rem;
			border-radius: 1rem;
            overflow: hidden;
			object-fit: contain;
			img {
				width: 10rem;
				height: 10rem;
			}
		}
	}
</style>
