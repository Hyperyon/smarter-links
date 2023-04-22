import { writable } from 'svelte/store';

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});

let snippet = `
#!/usr/bin/env python3
from datetime import datetime

def red(filename):
    with open(filename, 'r',encoding='utf-8') as f:return f.read()
def get_time():
    return datetime.now().strftime('%d/%m %H:%M')`

tag.set(false)
storedb.set([{id:0, link:'google.fr',title:'first link'},
			{id:1, link:'another element',tags:'all about tags'},
			{id:2,link:'if 1:\n\tprint("hello world")'},
			{id:3,link:snippet,title:'server example'}])

