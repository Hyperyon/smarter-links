<script>
import Prism from "./PrismJS.svelte"
import {storedb} from './ServiceStore.js'


 function is_code(item) {
		if(item.includes('\n'))
 	return true
 }
</script>

{#each $storedb as code}
	{#if is_code(code.link)}
		<Prism language="python" {code}/>
	{/if}
{/each}



