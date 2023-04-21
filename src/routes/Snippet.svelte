<svelte:head>
  <title>Prism Syntax Highlighter Example</title>
  <meta name="description" content="">
</svelte:head>
<script>
import Prism from "./PrismJS.svelte"
import {storedb} from './ServiceStore.js'

let code_sample = `

def get_sticker(): return r.choice(stickers_list)
def is_duplicate(liste):
    matchdd = list(set(liste))

    print(matchdd)
    if len(matchdd) == 1: return 'bingo'
    elif len(matchdd) == 2: return '2/3'
    elif 'banane' in list(set(liste)):return 'bananed'
    else : return False
`

 function is_code(item) {
		if(item.includes('\n'))
 	return true
 }
</script>

{#each $storedb as code}
{#if is_code(code.link)}
<Prism language="python" code="{code.link}" header="simple python Code"/>
{/if}
{/each}

<Prism language="python" code="{code_sample}" header="simple python Code"/>


