<script>
	export let image = ''
	export let title = ''
	export let description = ''
	export let ID = ''
    import { theme } from "$lib/theme";
</script>

<a class="pack" href={`/pack/${ID}`} class:packDark={$theme === 'dark'}>
	{#if image}
		<img src={image} class="pack-image" alt={title} />
	{/if}
	<div class="pack-content">
		<div class="pack-title">{title}</div>
		<div class="pack-text-border">
			{description}
		</div>
	</div>
</a>

<style>
	.pack {
		cursor: pointer;
		height: fit-content;
		position: relative;
		text-align: left;
		min-height: 22vh;
		border-radius: 0.6rem;
        overflow: hidden;
        width: 100%;
		transition: all 0.2s;
        background-color: #f6f6f6;
        box-shadow: 1px 1px 5px #45455940;
	}
	.packDark {
		background-color: rgba(31, 29, 37, 0.9);
        box-shadow: unset;
        color: #f6f6f6;
	}
	.pack:hover {
		transform: scale(1.02);
	}
	.pack:active {
		transform: scale(1.02);
	}
	.pack-image {
		width: 100%;
		object-fit: cover;
		height: 9rem;
		transition: all 0.2s;
		filter: brightness(0.7);
		opacity: 0.85;
		object-position: center center;
	}
	.pack:hover .pack-image {
		filter: brightness(0.9);
	}
	.pack-content {
		padding: 0.6rem 0.8rem;
		padding-top: 0.8rem;
		margin-top: auto;
	}
	.pack-content .pack-title {
		margin: 0;
		font-size: 1.3rem;
	}
	.pack-button {
		padding: 0.6rem 0.8rem;
		color: var(--text-color);
		text-align: center;
		font-size: 0.9rem;
		border-radius: 0.4rem;
		margin-bottom: 0.2rem;
		background-color: rgba(41, 38, 49, 0.9);
		width: 100%;
	}
	.pack-content .pack-text,
	.pack-text-border {
		font-size: 0.9rem;
		padding: 0;
		padding-left: 0.5rem;
		margin: 0.3rem;
		margin-left: 0;
		line-height: 1.2rem;
	}
	.pack-text-border {
		border-left: solid 2px #3d4553;
		padding-top: 0.2rem;
	}
</style>
