<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-okaidia.min.css">  
</svelte:head>

<script>
import {save, storedb} from './ServiceStore.js'
import { onMount } from 'svelte'
import { autoWidth } from 'svelte-input-auto-width'
export let language
export let code

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

	code{
		outline: none;
	}
</style>

<div class="w3-container">
	<cc on:contextmenu|preventDefault={edit}>
		{#if is_edit}
			<input use:autoWidth type="text" bind:value="{code.title}">
		{:else}
			<span on:dblclick={removeLine}>{code.title}</span>
		{/if}
	</cc>

	<pre on:contextmenu|preventDefault={copy}><code contenteditable="true" class="language-{language}" on:keydown={update_code} >{code.link}</code></pre>
</div>