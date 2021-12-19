import { writable } from "svelte/store";
import type { Writable } from 'svelte/store'


class Packs{
    data:Writable<Pack[]> = writable([])
    constructor(){

    }
    load = () => {

    }

    add = () => {

    }

    remove = () => {

    }
    sync = () => {

    }
}

class Pack{
    author:string = ""
    name:string = ""
    description:string = ""
    audios:Audio[] = []
    image: string = ""
    constructor(){

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
export const packStore = new Packs()