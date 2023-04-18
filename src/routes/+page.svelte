<script type="text/javascript">
import {storedb, id} from './ServiceStore.js'
import Line from './Line.svelte'

let input = ''
let is_tag = false
let tags = ''
$id=1
function show(e) {

	if(e.key === 'Enter'){
		e.preventDefault()
		addLine()
		input = ''
		is_tag = false
		console.log($id,$storedb)
	}
	if(e.key === 'Control') is_tag = true
	
}

function paste() {
const imageUrl =  navigator.clipboard.readText();
}

function addLine() {
	if(input==='') return false
	let index = $storedb.length
	$storedb[index] = {id:$id,link:input, title:'my title'}
	if(tags.length > 0)
		$storedb[index] = {id:$id,link:input, title:'my title', tags:tags}
	$id++
	input = ''
	tags= ''
}

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

	#input:focus{
		background: skyblue;
		outline: none;
	}
</style>


	<textarea type="text" id="input"
	bind:value={input}
	on:keydown={e=>{show(e)}} on:contextmenu|preventDefault={paste} />
{#if is_tag}
<input type="text" bind:value={tags}>
{/if}


<input type="button" value="+" 
on:click={addLine} >


	{#each $storedb as item}
	 <svelte:component this={Line} objAttr={item} />
	{/each}



<!-- {#each content as item}
<p>{item}</p>
{/each} -->
