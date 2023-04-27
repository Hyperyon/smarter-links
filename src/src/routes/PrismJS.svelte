<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-okaidia.min.css">  
</svelte:head>

<script>
import {save, storedb,copy} from './ServiceStore.js'
import { onMount } from 'svelte'
import { autoWidth } from 'svelte-input-auto-width'
import MediaQuery from 'svelte-media-queries'
export let language
export let code
let matches

  onMount(() => {

   let script = document.createElement('script');
   script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js"
   document.head.append(script);

   script.onload = function() {

     let langJS = false;
     let lang_script;
     let lang_module;
     switch (language) {

       case "javascript":
         lang_module = "https://prismjs.com/components/prism-javascript.js"
         langJS = true;
         break    

       case "python":
         lang_module = "https://prismjs.com/components/prism-python.js"
         langJS = true;
         break                

       case "css":
         lang_module = "https://prismjs.com/components/prism-css.js"
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

function update_code(e) {
code.link = e.originalTarget.innerText
}
let is_edit = false

function edit() {

	is_edit = !is_edit
	if(is_edit){
		console.log("edit mode")
	}else{
    save($storedb)
  }
}

 function removeLine() {
	$storedb = $storedb.filter((value)=>{
		if(value.id != code.id) return value
	})
	storedb.set($storedb)
  save($storedb)

}

if(code.title === '')
	code.title = 'default'
</script>

<MediaQuery query='(max-width:480px)' bind:matches></MediaQuery>

<div class="{matches?'':'w3-container'}">
	<cc class="{matches? 'mobile':''}"on:contextmenu|preventDefault={edit}>
		{#if is_edit}
			<input use:autoWidth type="text" bind:value="{code.title}">
		{:else}
			<span on:dblclick={removeLine}>{code.title}</span>
		{/if}
	</cc>

	<pre class="{matches?'pre-m':''}"on:contextmenu|preventDefault={copy(code)}><code contenteditable="true" class="language-{language}" on:keydown={update_code} >{code.link}</code></pre>
</div>

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
    margin-top: 10px;
    text-shadow: none;
  }

  cc.mobile{
        color: black;
    background-color:lightgray;
    right:10%;
    width: auto;
    position:absolute;
    font-size: 0.1em;
    border-radius: 5px;
    padding: 0 0.5em;
    margin-top: 10px;
    text-shadow: none;
  }

  .pre-m{
    font-size: 0.6em;
  }

  code{
    outline: none;
  }
</style>