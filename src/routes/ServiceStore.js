import { writable, derived } from 'svelte/store';
import { fly } from "svelte/transition"
import { create_in_transition } from "svelte/internal"

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});
export let input_ = writable('');
export let s = writable(false)

tag.set(false)

export async function read() { // do not forget changin ip adresse swtich to 86
	const res = await fetch('http://192.168.1.86:7999', {method: 'GET',}) 
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


export function copy(item, element=false) {
	let intro = false
    let dummy = document.createElement("textarea")
    document.body.appendChild(dummy)
    dummy.value = item.link
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
	if (!intro && element) 
		intro = create_in_transition(element, fly, {x: 10, duration:350})
	if(intro)	
		intro.start()

}

export async function save (data) {
		const res = await fetch('http://192.168.1.86:7999/lapost', {
		method: 'POST',
		body: JSON.stringify(data)
	})

}

export function is_search(store, from, input_,s=false){
	const max_result = 12
	let data = [];input_ = input_.toLowerCase()
	if(from === 'snippet'){
		store.forEach(item=>{
			if('langage' in item)
				if (item.link.includes(input_) || item.title.includes(input_)
					|| item.langage.includes(input_))
					data.push(item)
		})

		data.reverse()
		if (data.length>max_result)
			data = data.slice(0,max_result)
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

	if(!s){
		data = data.filter(x=>x.tags.length === 0 || x.tags[0] !== '.')
	}else{
		data = data.filter(item=>item.tags.length && item.tags[0] === '.')
	}
	return data
}
