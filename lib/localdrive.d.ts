/// <reference types="node" />
import { Readable, Writable } from 'streamx';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import { Item, ListOpts } from './typings';
type Files<S> = AsyncGenerator<Item<S> & {
    absolutePath: string;
}, any, Item<S> & {
    absolutePath: string;
}>;
export declare class LocalDrive {
    #private;
    root: string;
    fsp: typeof fsp;
    createReadStream: typeof fs.createReadStream;
    createWriteStream: typeof fs.createWriteStream;
    constructor(root?: string);
    resolvePath(path: any): string;
    filesGenerator<S extends boolean = false>(dirPath: string, { recursive, fileOnly, withStats, search }?: Omit<Partial<{
        recursive: boolean;
        withStats: S;
        fileOnly: boolean;
        readable: boolean;
        search: string | RegExp;
    }>, "readable">): Files<S>;
    list<S extends boolean = false>(path: any, opts: Omit<ListOpts<S>, 'readable'>): Promise<(Item<S> & {
        absolutePath: string;
    })[]>;
    createFolderReadStream(path: any): Readable<any, any, any, true, false, import("streamx").ReadableEvents<any>>;
    createFolderWriteStream(path: string): Writable<{
        path: string;
        readable: Readable;
    }, {
        path: string;
        readable: Readable;
    }, {
        path: string;
        readable: Readable;
    }, false, true, import("streamx").WritableEvents<{
        path: string;
        readable: Readable;
    }>>;
}
export {};
