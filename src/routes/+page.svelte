<script type="text/javascript">
import { onMount } from 'svelte';
import { autoWidth } from 'svelte-input-auto-width';
import serviceStore,{storedb, id, tag, count_result, input_,count} from './ServiceStore.js'

import Line from './Line.svelte'
import Tabs from "./Tabs.svelte"
import Url from "./Url.svelte"
import Code from "./Snippet.svelte"
import Main from "./Main.svelte"

// onMount(async ()=>{ // do not forget changin ip adresse swtich to 86
// 		const res = await fetch('http://192.168.1.73:7999', {method: 'GET',})
// 		let data = await res.json()
// 		storedb.set(data)
// 	})


// $: $storedb, $count += serviceStore.save($storedb,$count),console.log($count,'²²²²')
$: $storedb, $count+=1,serviceStore.save($storedb,$count)

let input = ''
let tags = ''
let title = ''
$id=4
function show(e) {
	if(e.key === 'Enter'){
		e.preventDefault()
		addLine()
	}
}
	$: $input_ = input

function addLine() {
	if(input==='') return false

 	if($storedb[0].id !== 0)
 		$storedb.reverse()
 	
	let index = $storedb.length
	$storedb[index] = {id:$id,link:input, title:title}
	if(tags.length > 0)
		$storedb[index] = {id:$id,link:input, title:title, tags:tags}
	$id++
	input = ''
	tags = ''
	title = ''
	$count_result = 0
	$input_ = ''
}

function reset() {
	$tag = false
	input = ''
}
let items = [
	{ 	label: "...",
		value: 1,
		component: Main},

	{ 	label: "Lien",
		value: 2,
		component: Url	},

	{ 	label: "Snippet",
		value: 3,
		component: Code}
 	]

function keyvent(e) {
	// const item = document.getElementById('input')
	// if(e.key === 'Enter' && document.activeElement !== item){
	// 	e.preventDefault()
	// 	item.focus()
	// }
}
function is_code(item) {
	if(item.includes('\n'))
		return true
}

</script>

<style type="text/css">
	#input{
		height: 1.8rem;
		width: 30rem;
		margin: 0 auto;
		padding: 8px;
		padding-top: 15px;
		border-radius: 20px;
		border: 1px grey solid;
		display: block;
		resize: none;
		font-size: 1.5em;
		display: inline;
	}

	#input:focus,#input:hover{
		background: skyblue;
		outline: none;
	}

	section{
		padding-top:30px;
		background: orange;
		width: 50rem;
		margin: 0 auto;
		text-align:center;
		height: 6rem;
	}
	input[type="button"]{
	padding: 0.6rem;
	position: relative;
	top:-15px;
	border-radius: 40px;
	}
	input[type="text"]{
		border-radius: 10px;
		padding: 5px;
	}
	input[type="text"]:focus,input[type="text"]:hover{
		background-color: skyblue;
		outline: none;
	}
</style>

<svelte:window on:keydown={keyvent}/>
<section>
	<input type="button" id="dev" on:click={()=>console.log($storedb)}>
<input id="add-button" type="button" value="Add" on:click={addLine} >
<textarea autofocus type="text" id="input"
bind:value={input}
on:keydown={e=>show(e)} />


<input type="button" value="reset" on:click={reset} />
<br>
{#if input}
	<input type="text" bind:value={tags} on:keydown={e=>{show(e)}} placeholder="tags">
	<input type="text" bind:value={title} on:keydown={e=>{show(e)}} placeholder="title"/>
	{#if is_code(input)}
		<input type="text" placeholder="langage">
	{/if}
{/if}


</section>

<Tabs {items} />


