import { Pack, id } from '$stores/Packs'
export default function packImporter(buffer: any){
    const metaLength = new DataView(buffer).getUint32(0,true)
    let readOffset = 4 
    const metadata = JSON.parse(
      new TextDecoder().decode(
        buffer.slice(readOffset, metaLength)
      ))
    readOffset = metaLength
    const audios = metadata.audioMetadata.map(audio => {
        const result = buffer.slice(readOffset, readOffset + audio.length)
        readOffset += audio.length
        return result
    })
    const pack = new Pack({
        name: metadata.name,
        description: metadata.description,
        author: metadata.author,
        image: metadata.image
    })
    pack.id = id(7)
    audios.forEach((audio,i) => {
        const meta = metadata.audioMetadata[i]
        pack.addAudio({
            name: meta.name,
            description: meta.description,
            buffer: audio
        })
    })
    return pack
}