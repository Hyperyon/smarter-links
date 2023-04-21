import { writable } from 'svelte/store';

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});

tag.set(false)
storedb.set([{id:0, link:'google.fr',title:'first link'},
			{id:1, link:'another element',tags:'all about tags'},
			{id:2,link:'if 1:\n\tprint("hello world")'}])