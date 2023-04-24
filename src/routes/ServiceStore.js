import { writable } from 'svelte/store';

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});
export let input_ = writable('');
export let count_result = writable({});
export let count = writable(0);

let snippet = `
#!/usr/bin/env python3
from datetime import datetime

def red(filename):
    with open(filename, 'r',encoding='utf-8') as f:return f.read()
def get_time():
    return datetime.now().strftime('%d/%m %H:%M')`

tag.set(false)

async function read() { // do not forget changin ip adresse swtich to 86
	// const res = await fetch('http://192.168.1.73:7999', {
	// 	method: 'GET',
	// })

 // let data = await res.json()

	// storedb.set(data)
	// console.log(data)
}
storedb.set([{id:0, link:'gossssogle.fr',title:'first link'},
			{id:1, link:'another element',tags:'all about tags'},
			{id:2,link:'if 1:\n\tprint("hello world")',title:'hallo'},
			{id:3,link:snippet,title:'server example'}])

// storedb.set([{id:0, link:'gossssogle.fr',title:'first link'},
// 			{id:1, link:'another element',tags:'all about tags'},
// 			{id:2,link:'if 1:\n\tprint("hello world")',title:'hallo'},
// 			{id:3,link:snippet,title:'server example'}])

 
async function save (data,count) {
	if(count > 2){
		const res = await fetch('http://192.168.1.73:7999/lapost', {
		method: 'POST',
		body: JSON.stringify(data)
	})
	}
}


const serviceStore = {
	read,
	save
}

export default serviceStore