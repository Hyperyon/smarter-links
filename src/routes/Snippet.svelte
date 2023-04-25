<script>
import Prism from "./PrismJS.svelte"
import {storedb, count_result, input_} from './ServiceStore.js'

$count_result = 0
const max_result = 15

 function is_code(item) {
	if('langage' in item && $count_result < max_result){
		$count_result++
		return true
	}
 }

function is_match(item) {
	return (item.link.includes($input_) ||
			item.title.includes($input_) || $input_ === '') ? true:false
}

</script>
<!-- {#each $storedb as code} -->
{#each { length: $storedb.length } as _, index}
	{@const reverseIndex = $storedb.length - 1 - index}
	{@const code = $storedb[reverseIndex]}
	{#if is_code(code) && is_match(code)}
		<Prism language="python" {code}/>
	{/if}
{/each}


