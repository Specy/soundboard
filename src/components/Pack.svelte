<script>
	export let image = ''
	export let title = ''
	export let description = ''
	export let author = ''
	export let ID = ''
    import { theme } from "$lib/theme";
</script>

<a class="pack" href={`/pack/${ID}`} class:packDark={$theme === 'dark'}>
	{#if image}
		<div class="pack-image">
			<img src={image}  alt={title} />
			<div class="pack-author">
				{author}
			</div>
		</div>
	{/if}
	<div class="pack-content">
		<div class="pack-title">{title}</div>
		<div class="pack-text-border">
			{description}
		</div>
	</div>
</a>

<style lang="scss">
	@import '../variables.scss';
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
		background-color: $dark;
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
		height: 9rem;
		transition: all 0.2s;
		opacity: 0.85;
		position: relative;
		> img{
			width: 100%;
			height: 100%;
			filter: brightness(0.7);
			transition: all 0.2s;
			object-position: center center;
			object-fit: cover;
		}
		> .pack-author{
			position: absolute;
			right: 0.5rem;
			bottom: 0.5rem;
			color: white;
			font-size: 1.2rem;
			text-shadow: rgb(0 0 0 / 29%) 1px 1px 3px, rgb(73 64 125 / 35%) 2px 4px 7px;
		}
	}
	.pack:hover .pack-image img{
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

	.pack-text-border {
		border-left: solid 2px #3d4553;
		padding-top: 0.2rem;
		font-size: 0.9rem;
		padding: 0;
		padding-left: 0.5rem;
		margin: 0.3rem;
		margin-left: 0;
		line-height: 1.2rem;
	}
</style>
