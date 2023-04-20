<script type="text/javascript">
	
import Line from './Line.svelte'
import {storedb, id, tag} from './ServiceStore.js'

function is_tag(element){
	if('tags' in element)
		if(element.tags.some(item=>item.includes($tag)))
			return true
}

</script>


{#each $storedb as item}
	{#if $tag}
	 	{#if is_tag(item)}
	 		<svelte:component this={Line} objAttr={item}  />
	 	{/if}
	
 	{:else}
	 	<svelte:component this={Line} objAttr={item}  />
	{/if}
{/each}