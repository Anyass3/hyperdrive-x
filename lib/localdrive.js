import { Readable, Writable } from 'streamx';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import { resolve, join, dirname } from 'path';
export class LocalDrive {
    root;
    createReadStream;
    createWriteStream;
    constructor(root = './') {
        this.root = resolve(root);
        this.#initFileStream();
    }
    resolvePath(path) {
        if (!path.startsWith(this.root)) {
            path = join(this.root, path);
        }
        return resolve(path);
    }
    resolveRelativePath(path) {
        if (path.startsWith(this.root)) {
            path = path.slice(this.root.length);
        }
        return path;
    }
    // @ts-ignore
    async *filesGenerator(dirPath, { recursive = false, fileOnly = false, withStats = false, search = '' } = {}) {
        dirPath = this.resolvePath(dirPath);
        for (const name of await fsp.readdir(dirPath)) {
            const match = name.match(search);
            const absolutePath = join(dirPath, name);
            const path = this.resolveRelativePath(absolutePath);
            const stat = await fsp.stat(absolutePath);
            let _stats = {};
            if (withStats) {
                _stats['stat'] = stat;
            }
            if (stat.isDirectory()) {
                if (!fileOnly && match)
                    yield { path, absolutePath, name, ..._stats };
                if (recursive)
                    yield* await this.filesGenerator(path, { recursive, fileOnly, withStats, search });
            }
            else if (match)
                yield { path, absolutePath, name, ..._stats };
        }
    }
    async list(path, opts) {
        const items = [];
        for await (const item of this.filesGenerator(path, opts))
            items.push(item);
        return items;
    }
    #initFileStream() {
        this.createReadStream = (path, opts) => {
            return fs.createReadStream(this.resolvePath(path), opts);
        };
        this.createWriteStream = (path, opts) => {
            return fs.createWriteStream(this.resolvePath(path), opts);
        };
    }
    createFolderReadStream(path) {
        const self = this;
        const files = this.filesGenerator(path, { fileOnly: true, recursive: true });
        return new Readable({
            async read(cb) {
                const { done, value } = await files.next();
                if (done) {
                    this.push(null);
                    return cb(null);
                }
                this.push({ path: value.absolutePath.slice(self.resolvePath(path).length), readable: fs.createReadStream(value.absolutePath) });
                return cb(null);
            }
        });
    }
    createFolderWriteStream(path) {
        const self = this;
        return new Writable({
            async write(data, cb) {
                if (!data?.path || !data?.readable) {
                    return cb(null);
                }
                try {
                    const newFilepath = self.resolvePath(join(path, data.path));
                    await fsp.mkdir(dirname(newFilepath), { recursive: true });
                    const ws = fs.createWriteStream(newFilepath);
                    data.readable.pipe(ws);
                    data.readable.on('error', cb);
                    ws.on('close', cb);
                }
                catch (error) {
                    cb(error);
                }
            },
        });
    }
}
