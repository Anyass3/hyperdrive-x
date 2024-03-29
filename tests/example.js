
import Corestore from 'corestore';
import RAM from 'random-access-memory'
import Hyperdrive from '../lib/index.js';


async function main() {
    const corestore = new Corestore((() => {
        return new RAM();
    }))

    const drive = new Hyperdrive(corestore);
    await drive.put('/a/greet.txt', Buffer.from('Hi there'))
    await drive.put('/a/hello.txt', Buffer.from('hello'))
    // await drive.put('/a/e', Buffer.from(''))
    await drive.put('/a/e/oom', Buffer.from(''))
    await drive.put('/a/b/hmm', Buffer.from('hmmm'))
    await drive.put('/a/c/p/dmt.txt', Buffer.from('dmt system'))
    await drive.put('/a/b/d/ok.py', Buffer.from('p=10'))

    await drive.move('/a/hello.txt', 'a/moved.tx')
    await drive.copy('/a/b/hmm', 'a/copied.tx')
    console.log(await drive.isDirectory('/a/b/hmm'))
    console.time('import')
    await drive.import('../lib', 'a/lib');
    await drive.import('../src', 'a/lib');
    console.timeEnd('import')
    // for await (const { key, value } of drive.files.createReadStream({ gt: '/a/c' })) {
    //     console.log(`${key} -> ${value}`)
    // }

    console.log('list', await drive.list('/a/lib', { search: '', fileOnly: false }))
    // console.log(await drive.read('/lib/typings.d.ts', 'utf-8'))
    // console.log('emtry', await drive.entry('/a/'))
    // console.time('export')
    // await drive.export('/lib', 'exports');
    // console.timeEnd('export')

    console.log('dir', await drive.readdir('/a', { fileOnly: true, nameOnly: true }));
    // console.log('dir', await drive.list('/a', { stat: true }));
    // console.log(await drive.entry('/a/b'));
    // console.log(await drive.get('/a/b/'));
}
main()