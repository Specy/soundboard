<script lang='ts'>
    import FaPlay from 'svelte-icons/fa/FaPlay.svelte'
    import FaTrashAlt from 'svelte-icons/fa/FaTrashAlt.svelte'
    import FaShareAlt from 'svelte-icons/fa/FaShareAlt.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    function dis(event,type){
        dispatch(type)
        event.preventDefault()
    }
    export let title: string = ""
    export let description: string = ""
</script>

<div class="audio" >
    <div class="column" style="padding: 0.3rem;">
        <div class="title">
            {title}
        </div>
        <div class="description">
            {description}
        </div>
    </div>
    <div class="row" style="height:3.4rem">
        <div 
            class="icon" 
            style="color: rgb(237, 79, 79);" 
            on:pointerdown={(e) => dis(e,'delete')}
        >
            <FaTrashAlt/>
        </div>
        <div class="buttons">
            <div
                class="icon" 
                style="background-color: rgb(85, 143, 144);" 
                on:pointerdown={(e) => dis(e,'share')}
            >
                <FaShareAlt />
            </div>
            <div 
                class="icon" 
                style="background-color: rgb(219, 0, 97);" 
                on:pointerdown={(e) => dis(e,'play')}
            > 
                <FaPlay />
            </div>
        </div>
    </div>

</div>


<style lang="scss">
    .audio{
        display: flex;
        padding: 0.4rem;
        border-radius: 0.6rem;
        width: 100%;
        height: fit-content;
        background-color: #f6f6f6;
        box-shadow: 1px 1px 5px #45455940;
        justify-content: space-between;
    }
    .icon{
        width: 1.2rem;
        cursor: pointer;
        height: 1.2rem;
    }
    .row{
        display: flex;
        align-items: center;
    }
    .buttons{
        display: grid;
        height: 3.4rem;
        margin-left: 0.8rem;
        grid-template-columns: 1fr 1fr;
        border-radius: 0.4rem;
        align-items: center;
        background-color: yellow;
        overflow: hidden;
        .icon{
            width: 2rem;
            padding: 0.5rem;
            display: flex;
            color: white;
            align-items: center;
            height: 100%;
        }
    }
    .title{
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    .description{
        font-size: 0.9rem;
    }
</style>