import { writable, derived } from 'svelte/store';

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});
export let input_ = writable('');

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

export function copy(item) {
    let dummy = document.createElement("textarea")
    document.body.appendChild(dummy)
    dummy.value = item.link
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
}

export async function save (data) {
		const res = await fetch('http://192.168.1.73:7999/lapost', {
		method: 'POST',
		body: JSON.stringify(data)
	})

}

export function is_search(store, from, input_){
	const max_result = 12
	let data = []
	if(from === 'snippet'){
		store.forEach(item=>{
			if('langage' in item)
				if (item.link.includes(input_) || item.title.includes(input_))
					data.push(item)
		})

		data.reverse()
		if (data.length>max_result)
			data = data.slice(0,max_result)
		console.log(data)
	}else{
		store.forEach(item=>{
			if(Object.values(item).length !== 5)
			if (item.link.includes(input_) ||
				item.title.includes(input_) ||
				item.tags.includes(input_)) 
					data.push(item)
		})

		data.reverse()
	}
	return data
}
