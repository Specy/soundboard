import { Pack } from '$stores/Packs'
export default function packImporter(buffer: any){
    const metaLength = new DataView(buffer).getUint32(0)
    let readOffset = 4 
    const metadata = 
      new TextDecoder().decode(
        buffer.slice(readOffset, readOffset += metaLength)
      )
    return console.log(metadata)

}