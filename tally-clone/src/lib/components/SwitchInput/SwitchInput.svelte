<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let isToggle: boolean;
  const dispatch = createEventDispatcher();

  function handleSwitchPress() {
    dispatch("switch-toggle");
  }

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 13:
        dispatch("switch-submit");
        return;
      case 32:
        handleSwitchPress();
        return;
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  tabindex="0"
  class="relative h-9 w-16 p-1 rounded-full transition-colors cursor-pointer select-none"
  class:bg-gray-200={!isToggle}
  class:bg-blue-700={isToggle}
  on:click={handleSwitchPress}
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
