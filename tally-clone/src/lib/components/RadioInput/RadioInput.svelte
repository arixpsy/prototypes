<script lang="ts">
  import { KEY_EVENT } from "@/@types/commons";
  import { createEventDispatcher } from "svelte";

  export let name: string = "";
  export let value: string = "";
  export let group: string = "";

  const dispatch = createEventDispatcher();

  $: isSelected = value === group;

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEY_EVENT.ENTER:
        dispatch("radio-submit", value);
        return;
      case KEY_EVENT.SPACE:
        dispatch("radio-select", value);
        return;
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<label
  tabindex="0"
  class="text-sm px-3 py-1.5 rounded-full transition-colors select-none touch-none cursor-pointer"
  class:focus:bg-gray-300={!isSelected}
  class:hover:bg-gray-300={!isSelected}
  class:bg-gray-200={!isSelected}
  class:text-gray-400={!isSelected}
  class:bg-blue-700={isSelected}
  class:text-white={isSelected}
  class:onSelected={isSelected}
  on:keyup={handleKeyUp}
>
  <input type="radio" bind:group {value} {name} class="hidden" />
  {value}</label
>

<style>
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .onSelected {
    animation: scale 300ms ease-out;
  }

  label {
    -webkit-tap-highlight-color: transparent;
  }
</style>
