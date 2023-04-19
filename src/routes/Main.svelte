<script type="text/javascript">
	
import Line from './Line.svelte'
import {storedb, id, db} from './ServiceStore.js'


</script>


	{#each $storedb as item}
	 <svelte:component this={Line} objAttr={item} />
	{/each}