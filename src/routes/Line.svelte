<script type="text/javascript">

import {storedb, db} from './ServiceStore.js'
export let objAttr = {}


function removeLine() {
	$db = $db.filter((value)=>{
		if(value.id != objAttr.id) return value
	})
	console.log($db)

	$storedb = $db
}

let fucking_regex = /^(?:(?:ftp|https?):\/\/)?(?!0\.0\.0\.0$)(?:(?:(?:1?\d\d?|2[0-4]\d|25[0-5])(?:\.(?!$))?){4}|(?:[a-zA-Z\d]\.|[a-zA-Z\d](?:(?![-.]{2})[a-zA-Z\d-]){0,63}?[a-zA-Z\d]\.){1,63}?[a-z]{2,63})(?:[:/].*)?$/gm;
var re_weburl = new RegExp(fucking_regex);
let is_url = re_weburl.test(objAttr.link) ? true:false

function manageclick() {
	console.log("maitrised")
	console.log(objAttr)
}

if('tags' in objAttr && !Array.isArray(objAttr.tags)){
	objAttr.tags = objAttr.tags.split(' ').filter(item =>item)
}

function filterTag(tag){
$storedb = $storedb.filter((objet)=>{
	if('tags' in objet)
		if (objet.tags.some(item => item.includes(tag)))
			return objet
	})
}

let tag_value = ''

</script>

<li class="line" on:contextmenu|preventDefault={manageclick}>
<input type="button" value={objAttr.id}  on:click={removeLine} />

	{#if is_url} <a href={objAttr.link} target="_blank">{objAttr.link}</a>
	{:else}		 {objAttr.link}
	{/if}

	{#if objAttr.title}
	{objAttr.title}
	{:else}
	no title
	{/if}

	{#if objAttr.tags}
	{#each objAttr.tags as tag}
<tag on:click={()=>filterTag(tag)}>{tag}</tag>

	{/each}

	{:else}
	no tag
	{/if}
</li>

<style type="text/css">
.line{
	background:lightgrey;
}

.line:hover{
	background: skyblue;
}

tag{
	background: #ffa5008f;
	border-radius: 8px;
	padding:2px;
	padding-left: 5px; 
	padding-right: 5px; 

    cursor:pointer;
    margin-left: 0.2rem; 
}

tag:active{
	background: orange;
}
</style>
