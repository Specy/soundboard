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