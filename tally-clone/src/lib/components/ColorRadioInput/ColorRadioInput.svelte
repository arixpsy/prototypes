<script lang="ts">
  import { KEY_EVENT } from "@/utils/types";
  import { createEventDispatcher } from "svelte";

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
  class={`h-8 w-8 rounded-full ${value} flex justify-center items-center cursor-pointer`}
  class:onSelected={isSelected}
  on:keyup={handleKeyUp}
>
  <div
    class="bg-white rounded-full transition-all"
    class:h-0={!isSelected}
    class:w-0={!isSelected}
    class:h-5={isSelected}
    class:w-5={isSelected}
  />
  <input type="radio" bind:group {value} class="hidden" />
</label>

<style>
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
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
