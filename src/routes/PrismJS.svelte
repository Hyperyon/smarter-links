<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-okaidia.min.css">  
</svelte:head>

<script>
import {storedb} from './ServiceStore.js'
import { onMount } from 'svelte';
export let language;
export let code;

  onMount(() => {

   let script = document.createElement('script');
   script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js"
   document.head.append(script);

   script.onload = function() {

     let langJS = false;
     let lang_script;
     let lang_module;
     switch (language) {

       case "json":
         lang_module = "https://prismjs.com/components/prism-json.js"
         langJS = true;
         break    

       case "python":
         lang_module = "https://prismjs.com/components/prism-python.js"
         langJS = true;
         break                

       case "sql":
         lang_module = "https://prismjs.com/components/prism-sql.js"
         langJS = true;
         break           
     }

     if (langJS == true) {

        lang_script = document.createElement('script');
        lang_script.src = lang_module
        lang_script.async = true
        document.head.append(lang_script);
        lang_script.onload = () => {
          Prism.highlightAll();
         }
     }
     else {
       Prism.highlightAll();
     }
   };
  });

function copy() {
    let dummy = document.createElement("textarea")
    document.body.appendChild(dummy)
    dummy.value = code.link
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
}

function update_code(e) {
code.link = e.originalTarget.innerText
}
</script>

<style type="text/css">
	.w3-container{

		width: 50%;
	}
	cc{
		color: black;
		background-color:lightgray;
		right:51%;
		width: auto;
		position:absolute;
		font-size: 0.9em;
		border-radius: 5px;
		padding: 0 0.5em;
		text-shadow: none;
	}

	code{
		outline: none;
	}


</style>
<div class="w3-container">
  <pre  on:contextmenu|preventDefault={copy}><cc>{code.title}</cc><code contenteditable="true" class="language-{language}" on:keydown={update_code}>{code.link}</code></pre>

</div>