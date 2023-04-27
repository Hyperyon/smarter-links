<script type="text/javascript">
	
import Line from './Line.svelte'
import {read, storedb, tag, input_,is_search} from './ServiceStore.js'

function is_tag(element){
	if('tags' in element)
		if(element.tags.some(item=>item.includes($tag)))
			return true
}

$: data = is_search(Object.values($storedb),'main',$input_)
</script>

<div on:dblclick={()=>$tag = false}>
{#each data as item}
	{#if $tag}
		{#if is_tag(item)}
			<svelte:component this={Line} objAttr={item}  />
		{/if}
		{:else}
			<svelte:component this={Line} objAttr={item}  />
	{/if}
{/each}
</div>


