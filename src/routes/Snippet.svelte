<script>
import Prism from "./PrismJS.svelte"
import {storedb, is_search, input_} from './ServiceStore.js'

$:data = is_search($storedb,'snippet',$input_)

</script>

{#each data as code}
	<Prism language="python" {code}/>
{/each}


