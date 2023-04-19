<script type="text/javascript">
import {storedb, id, db} from './ServiceStore.js'
import Line from './Line.svelte'
import Tabs from "./Tabs.svelte"
import Url from "./Url.svelte"
import Main from "./Main.svelte"



let input = ''
let tags = ''
$id=2
$db = Object.assign([], $storedb)

function show(e) {

	if(e.key === 'Enter'){
		e.preventDefault()
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
	$db.push($storedb[index])
}

function reset() {
	console.log($db)
	storedb.set([...$db])
}


  let items = [
    { label: "Content",
		 value: 1,
		 component: Main
		},
    { label: "Interactions",
		 value: 2,
		 component: Url
		}
  ]


</script>


<style type="text/css">
	#input{
		height: 0.8rem;
		width: 30rem;
		margin: 0 auto;
		padding: 8px;
		border-radius: 10px;
		border: 1px grey solid;
		display: block;
		resize: none;
	}

	#input:focus,#input:hover{
		background: skyblue;
		outline: none;
	}
</style>


<textarea type="text" id="input"
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

