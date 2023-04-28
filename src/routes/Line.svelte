<script type="text/javascript">
import {save,storedb, tag,copy} from './ServiceStore.js'
import { autoWidth } from 'svelte-input-auto-width'
import MediaQuery from 'svelte-media-queries'
export let objAttr = {}

function removeLine() {
	$storedb = $storedb.filter((value)=>{
		if(value.id != objAttr.id) return value
	})
	storedb.set($storedb)
	save($storedb)
}

let fucking_regex = /^(?:(?:ftp|https?):\/\/)?(?!0\.0\.0\.0$)(?:(?:(?:1?\d\d?|2[0-4]\d|25[0-5])(?:\.(?!$))?){4}|(?:[a-zA-Z\d]\.|[a-zA-Z\d](?:(?![-.]{2})[a-zA-Z\d-]){0,63}?[a-zA-Z\d]\.){1,63}?[a-z]{2,63})(?:[:/].*)?$/gm;
var re_weburl = new RegExp(fucking_regex);
let is_url = re_weburl.test(objAttr.link) ? true:false
let is_edit = false
let edit_tag = ''
function edit() {

	is_edit = !is_edit
	if(is_edit){ //edit tag buggy, type twice to write new tag
		console.log("edit mode")
		if(objAttr.tags && Array.isArray(objAttr.tags)){
			edit_tag = objAttr.tags.join(' ')
		}
	}

	if('tags' in objAttr)
		objAttr.tags = edit_tag.split(' ').filter(item =>item)
	if(!is_edit)
		save($storedb)
}

// modif tag manage secret here
if('tags' in objAttr && !Array.isArray(objAttr.tags))
	objAttr.tags = objAttr.tags.split(' ').filter(item =>item)

function filterTag(tag_element){
	if('tags' in objAttr){
		$tag = ($tag===tag_element)? false:tag_element
	}
}

let matches

// function short_link(){
// 	return objAttr.link.length> 30 ? objAttr.link.slice(0,30)+'...':objAttr.link}

let short_link =()=>{return objAttr.link.length> 30 ? objAttr.link.slice(0,30)+'...':objAttr.link}


</script>

<li class="{matches ? 'line-m':'line'}" on:contextmenu|preventDefault={edit}>
<input type="button" value={objAttr.id}  on:click={removeLine} />
{#if !is_edit}
<x on:click={copy(objAttr)}>
	{#if is_url} 
		{#if matches}
		<a class="link-m" href={objAttr.link} target="_blank">{short_link()}</a>
		{:else}
		<a href={objAttr.link} target="_blank">{objAttr.link}</a>
		{/if}
	{:else}		 
		{objAttr.link}
	{/if}

	{#if objAttr.title}
		{objAttr.title}

	{/if}
	
	{#if objAttr.tags && objAttr.tags[0] !== '.'}
		{#each objAttr.tags as tag}
			<button on:click={()=>filterTag(tag)}>{tag}</button>
		{/each}
	{/if}
</x>
{:else}
	<input type="text" on:mouseenter={copy(objAttr)} bind:value={objAttr.link}  use:autoWidth placeholder="link">
	<input type="text" bind:value={objAttr.title}  use:autoWidth placeholder="title">


	{#if objAttr.tags}
		{#if objAttr.tags[0] !== '.'} <input type="text" bind:value={edit_tag} use:autoWidth >{/if}
	{:else}
		{#if objAttr.tags[0] !== '.'}<input type="text" bind:value={objAttr.tags} use:autoWidth placeholder="tags"  >{/if}
	{/if}
{/if}

</li>


<MediaQuery query='(max-width:480px)' bind:matches>
</MediaQuery>

<style type="text/css">
	input[type="text"]{
		border-radius: 8px;
		font-size: 1em;
		padding-left: 8px;
		padding-right: 8px;
	}

	input[type="text"]:focus,input[type="text"]:hover{
		background-color:#94b4f2c4;
	}

.line{
	background-image: linear-gradient(to right, #e1e1e182, white 95%);
	margin: 0 auto;
	list-style-type: none;
	padding: 4px;
	border-radius: 5px;
}

.line-m{
	list-style-type: none;
	background: #e1e1e182;
  text-overflow: ellipsis;
  width: 100%;
	font-size: 0.8em;
	margin-top:5px; 
	color: lightgray;

}

.link-m{
}

.line:hover{
	background: lightgray;
}

span{
	background: #ffa5008f;
	border-radius: 8px;
	padding:2px;
	padding-left: 5px; 
	padding-right: 5px; 
    cursor:pointer;
    margin-left: 0.2rem; 
}

span:active{
	background: orange;
}

a{
	text-decoration: none;
	color:#3a41b0;
}

</style>
