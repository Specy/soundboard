<script>
    export let href = ''
    export let target = ''
    export let style = ''
    export let bg = 'rgb(219, 0, 97)'
    export let color = 'white'
</script>

<a {href} {target} style={`background-color:${bg}; color:${color}; ${style}`} class="btn">
    <slot/>
</a>

<style>
    .btn {
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.5rem;
		border-radius: 0.5rem;
		color: white;
		text-align: center;
		font-weight: bold;
		display: flex;
		transition: all 0.2s;
		padding-left: 0.8rem;
		font-size: 1rem;
		justify-content: center;
		border: none;
		cursor: pointer;
	}
	.btn:hover {
		filter: brightness(1.2);
	}
</style>