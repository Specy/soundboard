<script>
	import Input from '$cmp/Input.svelte'
	import Title from '$cmp/Title.svelte'
    import Button from '$cmp/Button.svelte'
	import { packStore } from '$stores/Packs'
    import { goto } from '$app/navigation';
    import { toast } from '$cmp/toast'
    import { theme } from '$lib/theme';
    let author = ''
    let name = ''
    let description = ''
    let image = ''

    async function create(){
        let pack = await packStore.add({
            author,
            name,
            description,
            image
        })  
        toast.success("Pack created")
        goto('/pack/'+pack.id)
    }
</script>
<title>
    Create new pack
</title>
<Title>Create new pack</Title>

<div class="input-wrapper" class:dark={$theme === 'dark'}>
    <Input bind:value={author} title='Author' hideStatus={true}/>
    <Input bind:value={name} title='Pack name' hideStatus={true}/>
    <Input bind:value={description} title='Description' hideStatus={true}/>
    <Input bind:value={image} title='Image' hideStatus={true}/>
    <Button value='Create' on:click={create} style='margin-top:2rem'/>
</div>



<style lang="scss">
    @import '../../variables.scss';
    .input-wrapper{
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
        padding: 0.8rem;
        border-radius: 0.8rem;
        background-color: #f6f6f6;
        box-shadow: 1px 1px 5px #45455940;
    }
    .dark{
        background-color: $dark;
        color: white;
        box-shadow: unset;
    }
</style>
