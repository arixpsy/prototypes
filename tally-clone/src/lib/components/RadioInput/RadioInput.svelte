<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: string = "";
  export let group: string = "";

  $: ({ ...InputProps } = $$props);
  $: isSelected = value === group;

  const dispatch = createEventDispatcher();

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 13:
        dispatch("radio-submit", value);
        return;
      case 32:
        dispatch("radio-select", value);
        return;
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<label
  tabindex="0"
  class="text-sm px-3 py-1.5 rounded-full outline-none transition-colors cursor-pointer"
  class:focus:bg-gray-300={!isSelected}
  class:hover:bg-gray-300={!isSelected}
  class:bg-gray-200={!isSelected}
  class:text-gray-400={!isSelected}
  class:bg-blue-700={isSelected}
  class:text-white={isSelected}
  class:onSelected={isSelected}
  on:keyup={handleKeyUp}
>
  <input type="radio" bind:group {value} {...InputProps} class="hidden" />
  {value}</label
>

<style>
  .onSelected {
    animation: scale 300ms ease-out;
  }

  label {
    -webkit-tap-highlight-color: transparent;
  }
</style>
