<script>
import Prism from "./PrismJS.svelte"
import {storedb, count_result, input_} from './ServiceStore.js'

$count_result = 0
const max_result = 5

 function is_code(item) {
	if(item.includes('\n') && $count_result < max_result){
		$count_result++
		return true
	}
 }

function is_match(item) {
	return (item.includes($input_) || $input_ === '') ? true:false
}

//optimize pls
if($storedb[0].id === 0)
  $storedb.reverse()

</script>
<!-- {#key $input_} -->

{#each $storedb as code}

	{#if is_code(code.link) && is_match(code.link)}
		<Prism language="python" {code}/>
	{/if}

{/each}
<!-- {/key} -->


