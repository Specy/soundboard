<script>
	import Input from '$cmp/Input.svelte'
	import Title from '$cmp/Title.svelte'
    import Button from '$cmp/Button.svelte'
	import { packStore } from '$stores/Packs'
    import { goto } from '$app/navigation';
    import { toast } from '$cmp/toast'
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

<Title>Create new pack</Title>

<div class="input-wrapper">
    <Input bind:value={author} title='Author' hideStatus={true}/>
    <Input bind:value={name} title='Pack name' hideStatus={true}/>
    <Input bind:value={description} title='Description' hideStatus={true}/>
    <Input bind:value={image} title='Image' hideStatus={true}/>
</div>
<Button value='Create' on:click={create}/>



<style lang="scss">
    .input-wrapper{
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
	.sub-title {

	}
</style>
