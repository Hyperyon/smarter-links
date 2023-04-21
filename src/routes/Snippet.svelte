<svelte:head>
  <title>Prism Syntax Highlighter Example</title>
  <meta name="description" content="">
</svelte:head>
<script>
import Prism from "./PrismJS.svelte";

let code_sample = `

def get_sticker(): return r.choice(stickers_list)
def is_duplicate(liste):
    match = list(set(liste))

    print(match)
    if len(match) == 1: return 'bingo'
    elif len(match) == 2: return '2/3'
    elif 'banane' in list(set(liste)):return 'bananed'
    else : return False
`

  
</script>
<Prism language="python" code="{code_sample}" header="simple python Code"/>

