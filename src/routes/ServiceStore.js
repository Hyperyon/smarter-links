import { writable } from 'svelte/store';

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});

tag.set(false)
storedb.set([{id:0, link:'tototo'},{id:1, link:'dddd'}])