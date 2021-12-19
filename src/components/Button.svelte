<script>
	export let disabled = false
	export let value = ''
	export let color = 'white'
	export let style = ''
	export let bg = 'rgb(219, 0, 97)'

</script>

<input
	type="button"
	class="btn"
	style={`background-color: ${bg}; color: ${color}; ${style}`}
	{disabled}
	{value}
    on:click
/>

<style>
    .btn {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
		color: white;
		text-align: center;
		display: flex;
		transition: all 0.2s;
		font-size: 1rem;
		justify-content: center;
		border: none;
		cursor: pointer;
	}
	.btn:hover {
		filter: brightness(1.2);
	}
</style>