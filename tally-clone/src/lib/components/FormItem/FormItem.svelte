<script lang="ts">
  import { fade } from "svelte/transition";

  export let label: string = "";
  export let errorMessage: string = "";
</script>

<div class="flex flex-col">
  <p class="text-sm mb-3 text-gray-500">
    {label}
  </p>
  <slot />
  <div class="text-xs text-red-400 my-2 h-4">
    {#if errorMessage}<p transition:fade>{errorMessage}</p>{/if}
  </div>
</div>
