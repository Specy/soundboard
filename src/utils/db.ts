import Dexie from 'dexie'
import type { Table } from 'dexie'

export interface Pack {
    id: string
    author:string
    name:string
    description:string
    image: string
}

export interface Audio {
    id: string
    packId: string
    name:string
    description:string
    buffer: any //add this
}

export class Db extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    packs!: Table<Pack>;
    audios!: Table<Audio>;

    constructor() {
        super('db');
        this.version(1).stores({
            packs: 'id, author, name',
            audios: 'id, packId, name'
        });
    }
}

export const DB = new Db();
