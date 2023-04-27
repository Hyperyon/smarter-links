<script type="text/javascript">
	
import Line from './Line.svelte'
import {storedb,tag, is_search, input_} from './ServiceStore.js'

function is_link(link) {
	let fucking_regex = /^(?:(?:ftp|https?):\/\/)?(?!0\.0\.0\.0$)(?:(?:(?:1?\d\d?|2[0-4]\d|25[0-5])(?:\.(?!$))?){4}|(?:[a-zA-Z\d]\.|[a-zA-Z\d](?:(?![-.]{2})[a-zA-Z\d-]){0,63}?[a-zA-Z\d]\.){1,63}?[a-z]{2,63})(?:[:/].*)?$/gm;
	var re_weburl = new RegExp(fucking_regex)
	
	return re_weburl.test(link) && !is_code(link)
}

function is_code(item) {
	if(item.includes('\n'))
		return true
}

function is_tag(element){
	if('tags' in element)
		if(element.tags.some(item=>item.includes($tag)))
			return true
}

$: data = is_search(Object.values($storedb),'url',$input_)

</script>


<div on:dblclick={()=>$tag = false}>
{#each data as item}
	{#if is_link(item.link)}
		{#if $tag}
			{#if is_tag(item)}
			<svelte:component this={Line} objAttr={item}  />
			{/if}
		{:else}
			<svelte:component this={Line} objAttr={item}  />
		{/if}
	{/if}
{/each}
</div>
