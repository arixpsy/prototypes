<script lang="ts">
  import { KEY_EVENT } from "@/utils/types";
  import { createEventDispatcher } from "svelte";

  export let isToggle: boolean = false;

  const dispatch = createEventDispatcher();

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEY_EVENT.ENTER:
        dispatch("switch-submit");
        return;
      case KEY_EVENT.SPACE:
        isToggle = !isToggle;
        return;
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  tabindex="0"
  class="relative h-9 w-16 p-1 my-1 rounded-full transition-colors cursor-pointer select-none"
  class:bg-gray-200={!isToggle}
  class:bg-blue-700={isToggle}
  on:click={() => (isToggle = !isToggle)}
  on:keyup={handleKeyUp}
>
  <div
    class="absolute flex justify-center h-7 w-7 rounded-full transition-transform bg-white"
    class:translate-x-7={isToggle}
  />
</div>

<style>
  div {
    -webkit-tap-highlight-color: transparent;
  }
</style>
