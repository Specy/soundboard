<script>
	import { page } from '$app/stores'
	import Title from '$cmp/Title.svelte'
	import { packStore } from '$stores/Packs'
	import FaTrashAlt from 'svelte-icons/fa/FaTrashAlt.svelte'
	import FaDownload from 'svelte-icons/fa/FaDownload.svelte'
	import Button from '$cmp/Button.svelte'
	import { goto } from '$app/navigation'
	import { toast } from '$cmp/toast'
	import FileImporter from '$cmp/FileImporter.svelte'
	import Input from '$cmp/Input.svelte'
	import Audio from '$cmp/Audio.svelte'
	import { theme } from '$lib/theme'
	const ID = $page.params.pack
	let pack = packStore.get(ID)
	let audios = pack?.audios
	let lastPlaying
	let newAudio = {
		name: '',
		fileName: '',
		description: '',
		buffer: undefined
	}
	packStore.data.subscribe(async () => {
		pack = packStore.get(ID)
		if (!pack) return
		await pack.load()
		audios = pack.audios
		if (!pack) return
	})
	async function deleteThis() {
		const name = pack.name
		if (confirm('Are you sure you want to delete: ' + name + '?')) {
			packStore.remove(ID)
			toast.success('Removed pack: ' + name)
			goto('/')
		}
	}
	function handleImport(event) {
		const result = event.detail
		newAudio.fileName = result.file.name
		newAudio.buffer = result.data
	}
	async function addAudio() {
		if (!newAudio.buffer) return toast.error('Please add an audio first')
		await pack.addAudio(newAudio)
		toast.success('Audio added')
		newAudio = {
			name: '',
			fileName: '',
			description: '',
			buffer: undefined
		}
	}
	async function share(audio) {
		const blob = new Blob([audio.buffer], { type: 'audio/mp3' })
		if (navigator.canShare && navigator.canShare()) {
			const file = new File([blob], audio.name + '.mp3', { type: 'audio/mp3' })
			navigator.share({
				title: audio.name,
				text: audio.description,
				files: [file]
			})
		} else {
			const a = document.createElement('a')
			a.href = window.URL.createObjectURL(blob)
			a.download = audio.name + '.mp3'
			a.click()
		}
	}
	function play(audio) {
		if (lastPlaying) lastPlaying.stop()
		lastPlaying = pack.play(audio)
	}
</script>

{#if pack}
	<div class="pack-top">
		<div class="column">
			<div class="pack-img">
				<img src={pack.image} alt={pack.name} />
			</div>
			<div class="buttons-wrapper">
				<div class="icon" on:click={() => toast.warn("Coming soon")}>
					<FaDownload />
				</div>
				<div class="icon" style="color: rgb(237, 79, 79);" on:click={deleteThis}>
					<FaTrashAlt />
				</div>
			</div>
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
	<div class="audios-wrapper">
		{#if audios}
			{#each $audios as audio}
				<Audio
					title={audio.name}
					description={audio.description}
					on:play={() => play(audio)}
					on:delete={() => pack.removeAudio(audio.id)}
					on:share={() => share(audio)}
				/>
			{/each}
		{:else}
			No audios here
		{/if}
	</div>
	<div class="new-audio" class:dark={$theme === 'dark'}>
		<div class="row">
			<div class="new-audio-file">
				{newAudio.fileName || 'New audio'}
			</div>
			<FileImporter on:import={handleImport} as="buffer">
				<Button value="Select audio" bg="rgb(85, 143, 144)" />
			</FileImporter>
		</div>
		<Input bind:value={newAudio.name} title="Name" hideStatus={true} />
		<Input bind:value={newAudio.description} title="Description" hideStatus={true} />
		<Button value="Create" style="margin-top:1rem;" on:click={addAudio} />
	</div>
{:else}
	<Title>Loading...</Title>
{/if}

<style lang="scss">
	@import '../../variables.scss';
	.pack-top {
		display: flex;
		margin-bottom: 2rem;
	}
	.pack-img {
		margin: 1rem;
		border-radius: 1rem;
		overflow: hidden;
		height: 10rem;
		width: 10rem;
		img {
			width: 100%;
			object-fit: cover;
			height: 100%;
		}
	}
	.new-audio {
		margin: 1rem;
		margin-top: 1rem;
		padding: 0.6rem;
		border-radius: 0.8rem;
		background-color: #f6f6f6;
		display: grid;
		grid-template-columns: minmax(0,1fr);
		gap: 0.5rem;
		box-shadow: 1px 1px 5px #45455940;
		> .row {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
    .new-audio-file{
        width: 100%;
        text-overflow: ellipsis;
        margin-right: 0.3rem;
        overflow: hidden;
        white-space: nowrap;
    }
	.dark {
		color: white;
		background-color: $dark;
		box-shadow: unset;
	}
	.audios-wrapper {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin: 1rem;
		margin-bottom: 0;
	}
	.column {
		display: flex;
		flex-direction: column;
	}

	.icon {
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}
	.icon:hover {
		color: $accent;
	}
	.buttons-wrapper {
		display: flex;
		justify-content: space-around;
	}
	@media (max-width: 800px) {
		.pack-top {
			flex-direction: column;
		}
		.pack-img {
			width: 100%;
			margin: 1rem 0rem;
		}
		.audios-wrapper {
			grid-template-columns: minmax(0, 1fr);
			gap: 0.8rem;
			margin: 0;
			margin-top: 1rem;
		}
		.new-audio {
			margin: 1rem 0;
			margin-top: 3rem;
		}
	}
</style>
