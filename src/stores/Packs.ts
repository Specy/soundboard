import { writable, get } from "svelte/store";
import type { Writable } from 'svelte/store'
import { browser } from "$app/env";
import type { Db } from "../utils/db";
let DB: Db

function id(length = 7) {
    let result = '';
    for(let i = 0; i < length; i++) {
        const random = Math.random();
        result += String.fromCharCode(Math.floor(random * 26) + (random < .5 ? 65 : 97));
    }
    return result;
}

class Packs{
    data:Writable<Pack[]> = writable([])
    loaded: boolean
    constructor(){

    }
    load = async () => {
        this.loaded = true
        const data = (await DB.packs.toArray()).map(pack => new Pack(pack))
        console.log(data)
        this.data.set(data)
    }
    get = (id:string) => {
       const data = get(this.data)
       return data.find(obj => obj.id === id)
    }

    add = async (data: newPack) => {
        if(!this.loaded) return
        const pack = new Pack(data)
        pack.id = id(7)
        this.data.update(d => [...d, pack])
        await DB.packs.add({...data, id:pack.id})
        return pack
    }

    remove = () => {
        if(!this.loaded) return
    }
    sync = () => {
        if(!this.loaded) return
    }
}

type newPack = {
    author:string
    name: string
    description: string
    image: string
    id?: string
}

class Pack{
    id:string = ''
    author:string = ""
    name:string = ""
    description:string = ""
    audios:Audio[] = []
    image: string = ""
    constructor(data: newPack){
        this.author = data.author
        this.name = data.name
        this. description = data.description
        this.image = data.image
        this.id = data.id || ""
    }
    load = () => {

    }
    add = () => {

    }
    remove = () => {

    }
    play = () => {
        
    }
}

class Audio{
    name:string = ""
    description:string = ""
    buffer: any //add this
    constructor(){

    }   
}
const packStore = new Packs() 

async function init() {
    if(browser){
        DB = (await import("../utils/db")).DB
        packStore.load()
    }
}
init()
export {
    packStore
}