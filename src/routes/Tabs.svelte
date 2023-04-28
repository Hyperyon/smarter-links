<script>
import {storedb, input_,s} from './ServiceStore.js'
import MediaQuery from 'svelte-media-queries'

  export let items = [];
  let item = items.pop()
  export let activeTabValue = 1;

  const handleClick = tabValue => () => (activeTabValue = tabValue)
  let matches
</script>

<ul>
{#each items as item}
	<li class={activeTabValue === item.value ? 'active' : ''}>
		<span on:click={handleClick(item.value)}>{item.label}</span>
	</li>
{/each}
<li><span id="{$s ? '':'h'}" on:click={handleClick(item.value)}> </span></li>
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
  <div class="{matches ? 'box-m':'box'}">
      {#if $input_}
        {#key $input_}<svelte:component this={item.component}/>{/key}
      {:else}
        <svelte:component this={item.component}/>
      {/if}
  </div>
  {/if}
{/each}


{#if activeTabValue == item.value && $s}
  <div class="matches ? 'box-m':'box'">
    <svelte:component this={item.component}/>
  </div>
{/if}



<MediaQuery query='(max-width:480px)' bind:matches></MediaQuery>

<style>
	.box {
		margin-bottom: 10px;
		padding: 20px;
		border: 1px solid #dee2e6;
    border-radius: 0 0 .5rem .5rem;
    border-top: 0;
	}

    .box-m {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #dee2e6;
    border-radius: 0 0 .5rem .5rem;
    border-top: 0;
    /*width: 110%;*/
  }
  ul {
    /*width:90%;*/

    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
  }
	li {
		margin-bottom: -1px;
	}

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span#h{
    display: none;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {

    color: #495057;
    background-color: lightgray;
    border: solid 1px #845858;
  }
</style>