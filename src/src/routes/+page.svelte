<script type="text/javascript">
import { onMount } from 'svelte';
import { autoWidth } from 'svelte-input-auto-width';
import {save,read, storedb, id, tag, input_,s} from './ServiceStore.js'
import S from './S.svelte'
import Line from './Line.svelte'
import Tabs from "./Tabs.svelte"
import Url from "./Url.svelte"
import Code from "./Snippet.svelte"
import Main from "./Main.svelte"
import MediaQuery from 'svelte-media-queries'

read()
let input = ''
let tags = ''
let title = ''
let increment = 0
let matches

function plus() {
	increment++
	if(increment>=5){
		$s=!$s
		increment = 0
	}
}

function show(e) {
	if(e.key === 'Enter'){
		e.preventDefault()
		addLine()
	}
}
	$: $input_ = input

function addLine() {
	if(input===''){
		plus()
		return false
	} 

	let index = $storedb.length

	$storedb[index] = {id:$id,link:input, title:title, tags:tags}
	if(enable_code){
		$storedb[index] = {id:$id,link:input, title:title, tags:tags,langage:lang_choice}
	}

	if($s)
		$storedb[index].tags = '. '+$storedb[index].tags

	$id++
	input = ''
	tags = ''
	title = ''
	$input_ = ''
	enable_code = false

	save($storedb)
}

function reset() {
	$tag = false
	input = ''
	enable_code = false
	$s = false
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
		component: Code},

	{ 	label: "Secret",
		value: 4,
		component: S}
 	]

$:info = $tag ? 'tag filter enable':''

let enable_code = false
function is_code(item) {
	if(item.includes('\n') || enable_code)
		enable_code =  true
		return true
}

let lang_choice = 'python'
</script>



<!-- <svelte:window on:keydown={keyvent}/> -->

<section class="{matches?'mobile':''}">
<input id={$s ? 's':''} class="{matches?'btn-m':''}" type="button" value="Add" on:click={addLine} >
<textarea placeholder={info} autofocus 
type="text" 
id="{matches ? 'input-m':'input'}"
bind:value={input}
on:keydown={e=>show(e)} />

<input class="{matches?'btn-m':''}" type="button" value="reset" on:click={reset} />
<br>
{#if input}
	<input class="{matches?'btn-m':''}" type="checkbox" bind:checked={enable_code} >
	<input class="{matches?'ipt-m':''}" type="text" bind:value={tags} on:keydown={e=>{show(e)}} placeholder="tags">
	<input class="{matches?'ipt-m':''}" type="text" bind:value={title} on:keydown={e=>{show(e)}} placeholder="title"/>
	{#if is_code(input) || enable_code}
		<select class="{matches?'ipt-m':''}"  bind:value={lang_choice}>
    <option selected value="python">Python</option>
    <option value="javascript">JavaScript</option>
    <option value="svelte">Svelte</option>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
</select>
	{/if}
{/if}


</section>

<Tabs {items} />

<MediaQuery query='(max-width:480px)' bind:matches></MediaQuery>

<style type="text/css">

	#s{
		background: #eaddfb;
	}
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

		#input-m{
		height: 1rem;
		width: 60%;
		margin: 0 auto;
		padding: 8px;
		border-radius: 20px;
		border: 1px grey solid;
		display: block;
		resize: none;
		display: inline;
	}

	#input:focus,#input:hover,#input-m:focus,#input-m:hover{
		background: skyblue;
		outline: none;
	}

	section{
		box-shadow: 3px 3px 3px 3px lightgray;
		border-radius: 30px;
		padding-top:30px;
		background: #e1e1e182;
		width: 50rem;
		margin: 0 auto;
		margin-top: 25px;
		text-align:center;
		height: 6rem;
	}

	section.mobile{
		border-radius: 30px;
		background: #e1e1e182;
		width: 100%;
		margin: 0 auto;
		text-align:center;
		height: 4rem;
	}

	input[type="button"]{
	padding: 0.6rem;
	position: relative;
	top:-15px;
	border-radius: 40px;
	outline: none;
	}



	.btn-m{
	/*position: relative;*/
	border-radius: 40px;
	outline: none;
	zoom:80%;

	}

	input[type="text"]{
		border-radius: 10px;
		padding: 5px;
	}
	input[type="text"]:focus,input[type="text"]:hover{
		background-color: skyblue;
		outline: none;
	}

	.ipt-m{
	position: relative;
	border-radius: 40px;
	outline: none;
	zoom:60%;
	width:15%;
	top:-12px;

	}

</style>


