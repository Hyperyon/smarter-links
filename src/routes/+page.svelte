<script type="text/javascript">

let input = ''
let content = []

function show(e) {

	if(e.key === 'Enter'){
		e.preventDefault()
		content = [...content,input]
		console.log(content)
		input = ''
	}
}

</script>

<style type="text/css">
	
	#input{
		height: 0.8rem;
		width: 30rem;
		margin: 0 auto;
		padding: 8px;
		border-radius: 10px;
		border: 1px grey solid;
		display: block;
		resize: none;
	}

	#input:focus{
		background: skyblue;
		outline: none;
	}
</style>
	<textarea type="text" id="input"
	bind:value={input}
	on:keydown={e=>{show(e)}} />
	

{#each content as item}
<p>{item}</p>
{/each}
