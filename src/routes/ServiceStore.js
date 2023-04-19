import { writable } from 'svelte/store';


export let storedb = writable({});
export let db = writable({});
export let id = writable({});
export let is_edit = writable({});
export let id_edit = writable({});


storedb.set([{id:0, link:'tototo'},{id:1, link:'dddd'}])
is_edit.set(false)