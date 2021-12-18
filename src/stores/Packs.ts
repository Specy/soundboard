import { writable } from "svelte/store";
class Packs{
    data:Pack[] = []
    constructor(){

    }
    load = () => {

    }

    add = () => {

    }

    remove = () => {

    }
}

class Pack{
    author:string = ""
    name:string = ""
    description:string = ""
    audios:Audio[] = []
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