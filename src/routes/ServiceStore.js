import { writable } from 'svelte/store';

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});
export let input_ = writable('');
export let count_result = writable({});

tag.set(false)

export async function read() { // do not forget changin ip adresse swtich to 86
	const res = await fetch('http://192.168.1.73:7999', {method: 'GET',}) 
	let data = [] 

 await res.json().then(arr=>{
	arr.forEach(x=>{
			data.push({id:x.id,link:x.link})
			id.set(x.id+1)})
	})
	storedb.set(data)
}

export async function save (data) {
		const res = await fetch('http://192.168.1.73:7999/lapost', {
		method: 'POST',
		body: JSON.stringify(data)
	})

}
