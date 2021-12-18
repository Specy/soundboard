<script lang="ts">
    export let text = 'Click to import'
    export let accept = '*'
    type inputTypes = 'text' | 'buffer'
    export let as:inputTypes = 'text'
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    let input
    function onChange(event:any) {
        if(event.target.files.length === 0) return
        const file = event.target.files[0]
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            dispatch('import', fileReader.result)
        };
        if(as === 'text') fileReader.readAsText(file);
        if(as === 'buffer') fileReader.readAsArrayBuffer(file);
    }

</script>

    <input 
        type="file"
        bind:this={input}
        {accept}
        style="display: none;"
        on:change={onChange}
    />
    <button on:click={() => input?.click()} class='file-input'>
        {text}
    </button>

<style>
    .file-input{
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
</style>