<script type="text/javascript">
import {storedb, id, tag} from './ServiceStore.js'
import Line from './Line.svelte'
import Tabs from "./Tabs.svelte"
import Url from "./Url.svelte"
import Code from "./Snippet.svelte"
import Main from "./Main.svelte"

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

function addLine() {
	if(input==='') return false
	let index = $storedb.length
	$storedb[index] = {id:$id,link:input, title:title}
	if(tags.length > 0)
		$storedb[index] = {id:$id,link:input, title:title, tags:tags}
	$id++
	input = ''
	tags = ''
	title = ''
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
	const item = document.getElementById('input')
	if(e.key === 'Enter' && document.activeElement !== item){
		e.preventDefault()
		item.focus()
	}
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
	}

	#input:focus,#input:hover{
		background: skyblue;
		outline: none;
	}
</style>

<svelte:window on:keydown={keyvent}/>
<textarea autofocus type="text" id="input"
bind:value={input}
on:keydown={e=>{(e)}} />

{#if input}
	<input type="text" bind:value={tags} on:keydown={e=>{show(e)}} placeholder="tags">
	<input type="text" bind:value={title} placeholder="title"/>
	{#if is_code(input)}
		<input type="text" placeholder="langage">
	{/if}
{/if}
<input type="button" value="+" 
on:click={addLine} >
<br>

<input type="button" value="reset" on:click={reset} />
<Tabs {items} />

