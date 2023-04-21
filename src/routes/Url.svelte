<script type="text/javascript">
	
import Line from './Line.svelte'
import {storedb, id} from './ServiceStore.js'

function is_link(link) {
	let fucking_regex = /^(?:(?:ftp|https?):\/\/)?(?!0\.0\.0\.0$)(?:(?:(?:1?\d\d?|2[0-4]\d|25[0-5])(?:\.(?!$))?){4}|(?:[a-zA-Z\d]\.|[a-zA-Z\d](?:(?![-.]{2})[a-zA-Z\d-]){0,63}?[a-zA-Z\d]\.){1,63}?[a-z]{2,63})(?:[:/].*)?$/gm;
	var re_weburl = new RegExp(fucking_regex)
	
	return re_weburl.test(link)
}

</script>


{#each $storedb as item}
	{#if is_link(item.link)}
		<svelte:component this={Line} objAttr={item} />
	{/if}
{/each}

