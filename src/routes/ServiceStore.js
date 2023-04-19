import { writable } from 'svelte/store';


export let storedb = writable({});
export let db = writable({});
export let id = writable({});

storedb.set([{id:0, link:'tototo'},{id:1, link:'dddd'}])