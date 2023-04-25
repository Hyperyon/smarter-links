import { writable, derived } from 'svelte/store';

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
 	let max_id = []
	arr.forEach(x=>{
		let title = ('title' in x) ? x.title:''
		let tags = ('tags' in x) ? x.tags:''
		let data_
		if('langage' in x)
			data_ = {id:x.id,link:x.link, title:title, tags:tags, langage:x.langage}
		else
			data_ = {id:x.id,link:x.link, title:title, tags:tags}
		data.push(data_)
			max_id.push(x.id)})
	id.set(Math.max(...max_id)+1)

	})
	storedb.set(data)
}

export async function save (data) {
		const res = await fetch('http://192.168.1.73:7999/lapost', {
		method: 'POST',
		body: JSON.stringify(data)
	})

}
