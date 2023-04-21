<script type="text/javascript">
import {storedb, id, tag} from './ServiceStore.js'
import Line from './Line.svelte'
import Tabs from "./Tabs.svelte"
import Url from "./Url.svelte"
import Code from "./Snippet.svelte"

import Main from "./Main.svelte"

let input = ''
let tags = ''
$id=2

function show(e) {

	if(e.key === 'Enter'){
		e.preventDefault()
		console.log([input],'5245')
		addLine()
		input = ''
		console.log($id,$storedb)
	}
}

function addLine() {
	if(input==='') return false
	let index = $storedb.length
	$storedb[index] = {id:$id,link:input, title:'my title'}
	if(tags.length > 0)
		$storedb[index] = {id:$id,link:input, title:'my title', tags:tags}
	$id++
	input = ''
	tags = ''
}

function reset() {
	$tag = false
	input = ''
}
  let items = [
    { label: "...",
		 value: 1,
		 component: Main
		},
    { label: "Lien",
		 value: 2,
		 component: Url
		},
	 { label: "Snippet",
	 	value: 3,
	 	component: Code
	}
  ]

function keyvent(e) {
	const item = document.getElementById('input')
	if(e.key === 'Enter' && document.activeElement !== item){
		e.preventDefault()
		item.focus()
	}
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
on:keydown={e=>{show(e)}} />

{#if input}
	<input type="text" bind:value={tags} on:keydown={e=>{show(e)}} >
{/if}
<input type="button" value="+" 
on:click={addLine} >
<br>

<input type="button" value="reset" on:click={reset} />
<Tabs {items} />

