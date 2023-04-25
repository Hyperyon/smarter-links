<script type="text/javascript">
	
import Line from './Line.svelte'
import { onMount } from 'svelte';
import {read, storedb, id, tag, input_} from './ServiceStore.js'

function is_tag(element){
	if('tags' in element)
		if(element.tags.some(item=>item.includes($tag)))
			return true
}

 function is_code(item) {
	if(item.includes('\n'))
		return true
 }

function is_match(item) {
	return (item.includes($input_) || $input_ === '') ? true:false
}
$: db = Object.values($storedb)
</script>

  {#each { length: db.length } as _, index}
    {@const reverseIndex = db.length - 1 - index}
    {@const item = db[reverseIndex]}

<!-- {#each Object.values($storedb).sort() as item} -->
	{#if !is_code(item.link) && is_match(item.link)}
		{#if $tag}
		 	{#if is_tag(item)}
		 		<svelte:component this={Line} objAttr={item}  />
		 	{/if}
		
	 	{:else}
		 	<svelte:component this={Line} objAttr={item}  />
		{/if}
	{/if}
{/each}

