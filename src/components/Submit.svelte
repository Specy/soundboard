<script>
	export let disabled = false
	export let value = 'Test'
	export let color = 'white'
	export let bg = 'rgb(219, 0, 97)'
</script>

<input
	type="submit"
	class="submit-btn"
	style={`background-color: ${bg}; color: ${color}`}
	{disabled}
	{value}
    on:click
/>

<style>
    .submit-btn {
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
	.submit-btn:hover {
		filter: brightness(1.2);
	}
</style>