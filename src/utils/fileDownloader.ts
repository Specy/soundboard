

export default function downloader(blob:Blob,name:string){
    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)
    a.href = window.URL.createObjectURL(blob)
    a.download = name
    a.click()
    a.remove()
}