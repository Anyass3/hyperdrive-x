export = Hypercore;
declare class Hypercore extends EventEmitter {
	static getProtocolMuxer(stream: any): any;
	static createProtocolStream(isInitiator: any, opts?: {}): any;
	static defaultStorage(storage: any, opts?: {}): any;
	constructor(storage: any, key?: any, opts?: any);
	storage: any;
	crypto: any;
	core: Core;
	replicator: Replicator;
	encryption: BlockEncryption;
	extensions: Map<any, any>;
	cache: any;
	valueEncoding: any;
	encodeBatch: any;
	activeRequests: any[];
	key: any;
	keyPair: any;
	readable: boolean;
	writable: boolean;
	opened: boolean;
	closed: boolean;
	sessions: any;
	auth: any;
	autoClose: boolean;
	closing: Promise<void>;
	opening: Promise<void>;
	_preappend: any;
	_snapshot: any;
	_findingPeers: number;
	snapshot(): any;
	session(opts?: {}): any;
	_passCapabilities(o: any): void;
	_openFromExisting(from: any, opts?: any): Promise<void>;
	_openSession(key: any, storage: any, opts?: any): Promise<void>;
	_openCapabilities(keyPair: any, storage: any, opts?: any): Promise<void>;
	close(): Promise<void>;
	_close(): Promise<void>;
	replicate(isInitiator: any, opts?: {}): any;
	get discoveryKey(): any;
	get length(): any;
	get byteLength(): any;
	get fork(): any;
	get peers(): any;
	get encryptionKey(): any;
	get padding(): any;
	ready(): Promise<void>;
	_onupload(index: any, value: any, from: any): void;
	_oncoreupdate(status: any, bitfield: any, value: any, from: any): void;
	_onpeerupdate(added: any, peer: any): void;
	setUserData(key: any, value: any): Promise<any>;
	getUserData(key: any): Promise<any>;
	findingPeers(): () => void;
	update(opts?: any): Promise<any>;
	seek(bytes: any, opts?: any): Promise<any>;
	has(index: any): Promise<any>;
	get(index: any, opts?: any): Promise<any>;
	_get(index: any, opts?: any): Promise<any>;
	createReadStream(opts?: any): ReadStream;
	createWriteStream(opts?: any): WriteStream;
	download(range: any): {
		downloaded(): Promise<any>;
		destroy(): void;
	};
	_download(range: any): Promise<any>;
	undownload(range: any): void;
	cancel(request: any): void;
	truncate(newLength?: number, fork?: number): Promise<void>;
	append(blocks: any): Promise<any>;
	treeHash(length: any): Promise<any>;
	registerExtension(name: any, handlers?: {}): any;
	_encode(enc: any, val: any): any;
	_decode(enc: any, block: any): any;
	[inspect](depth: any, opts?: any): string;
	[promises]: boolean;
}

import { EventEmitter } from 'events';

import Replicator from './lib/replicator';
import Core from './lib/core';
import BlockEncryption from './lib/block-encryption';
import { ReadStream } from './lib/streams';
import { WriteStream } from './lib/streams';

declare const inspect: unique symbol;
declare const promises: unique symbol;
