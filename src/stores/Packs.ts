import { writable, get } from "svelte/store";
import type { Writable } from 'svelte/store'
import { browser } from "$app/env";
import type { Db } from "$utils/db";
import fileDownloader from "$utils/fileDownloader"
let DB: Db
let audioContext: AudioContext
if(browser) audioContext = new AudioContext()
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
        this.data.set(data)
    }
    get = (id:string):Pack | null => {
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
    appendPack = async (pack: Pack) => {
        const data = pack.toObj()
        this.data.update(d => [...d, pack])
        await DB.packs.add({...data, id:pack.id})
    }
    remove = async (id:string) => {
        if(!this.loaded) return
        await DB.packs.delete(id)
        await DB.audios.delete(id)
        this.data.update(d => d.filter((p) => p.id !== id))
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
    audios:Writable<Audio[]> = writable([])
    image: string = ""
    constructor(data: newPack){
        this.author = data.author
        this.name = data.name
        this.description = data.description
        this.image = data.image
        this.id = data.id || ""
    }
    load = async () => {
        const query = await DB.audios.where({packId: this.id}).toArray()
        const audios = query.map(audio => new Audio(audio))
        await Promise.all(audios.map(audio => audio.decode(audioContext)))
        this.audios.set(audios)
    }
    addAudio = async (data: newAudio) => {
        const audioId = id(7)
        const newAudio = new Audio(data)
        newAudio.id = audioId
        newAudio.packId = this.id
        await DB.audios.add(newAudio.toObj())
        newAudio.decode(audioContext)
        this.audios.update((audios) => [...audios, newAudio] )
    }
    removeAudio = async (id:string) => {
        await DB.audios.delete(id)
        this.audios.update(d => d.filter((a) => a.id !== id))
    }
    toObj = ():newPack => {
        return {
            author: this.author,
            description: this.description,
            image: this.image,
            name: this.name,
            id: this.id
        }
    }
    toFile = () => {
        const audios = get(this.audios)
        const audioMetadata = audios.map((audio) => {
            return {
                length: audio.buffer.byteLength,
                name: audio.name,
                description: audio.description,
            }
        })
        const metadata = {
            author: this.author,
            name: this.name,
            image: this.image,
            description: this.description,
            audioMetadata: audioMetadata
        }
        const metaString = new TextEncoder().encode(JSON.stringify(metadata))
        const marker = new Uint32Array([metaString.byteLength + 4])
        const blob = new Blob([
            marker,
            metaString,
            ...(audios.map(audio => audio.buffer))
        ])
        fileDownloader(blob,`${this.name}-${this.author}.soundpack`)
    }
    play = (audio: Audio) => {
        let player = audioContext.createBufferSource()
        player.buffer = audio.decoded
        player.connect(audioContext.destination)
        player.start(0)
        player.onended = () => {
            player.stop()
            player.disconnect()
        }
        return player
    }
}


type newAudio = {
    name: string
    description: string
    id?: string
    packId?: string
    buffer?: any
}
class Audio{
    name:string = ""
    description:string = ""
    buffer: any //add this
    decoded: any
    id: string = ""
    packId: string = ""

    constructor(data: newAudio){
        this.name = data.name
        this.description = data.description
        this.id = data.id || ''
        this.packId = data.packId || ''
        this.buffer = data.buffer || new ArrayBuffer(4)
    }  
    toObj = () => {
        return {
            name:this.name,
            description: this.description,
            buffer: this.buffer,
            id: this.id,
            packId: this.packId
        }
    }
    decode = async (context: AudioContext) => {
        this.decoded = await context.decodeAudioData(this.buffer.slice(0))
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
    packStore,
    Pack,
    Audio
}
export type{
    newAudio,
    newPack,
}