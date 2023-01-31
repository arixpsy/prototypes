<script lang="ts">
  import { Icon } from "@/lib/components";
  import { KEY_EVENT } from "@/@types/commons";
  import { createEventDispatcher } from "svelte";
  import { slide, fade } from "svelte/transition";

  export let value: number;
  export let isCustom: boolean;

  const dispatch = createEventDispatcher();

  $: if (isCustom) {
    value = 0;
  }

  $: if (!isCustom) {
    value = 1;
  }

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEY_EVENT.ENTER:
        dispatch("switch-submit");
        return;
      case KEY_EVENT.SPACE:
        isCustom = !isCustom;
        return;
    }
  }

  function handleIncrementCounter() {
    value++;
  }

  function handleDecrementCounter() {
    if (value > 1) value--;
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div>
  <div class="flex w-full text-center text-sm">
    <div
      class="w-full touch-none select-none rounded-tl-full rounded-bl-full p-1.5 text-gray-400 transition-colors"
      class:cursor-pointer={isCustom}
      class:bg-gray-200={isCustom}
      class:hover:bg-gray-300={isCustom}
      class:bg-blue-700={!isCustom}
      class:text-white={!isCustom}
      on:click={() => (isCustom = false)}
      tabindex="0"
      on:keyup={handleKeyUp}
    >
      Fixed
    </div>
    <div
      class="w-full touch-none select-none rounded-tr-full rounded-br-full p-1.5 text-gray-400 transition-colors"
      class:cursor-pointer={!isCustom}
      class:bg-gray-200={!isCustom}
      class:hover:bg-gray-300={!isCustom}
      class:bg-blue-700={isCustom}
      class:text-white={isCustom}
      on:click={() => (isCustom = true)}
      tabindex="0"
      on:keyup={handleKeyUp}
    >
      Custom
    </div>
  </div>

  {#if !isCustom}
    <div
      transition:slide|local={{ duration: 500 }}
      class="mt-6 flex items-center justify-center gap-6"
    >
      <button
        class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300"
        on:click|preventDefault={handleDecrementCounter}
        transition:fade
        type="button"
      >
        <Icon.Minus />
      </button>

      <p class="w-16 text-center text-2xl" transition:fade>{value}</p>

      <button
        class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300"
        on:click|preventDefault={handleIncrementCounter}
        transition:fade
        type="button"
      >
        <Icon.Plus />
      </button>
    </div>
  {/if}
</div>

<style>
  button,
  div {
    -webkit-tap-highlight-color: transparent;
  }
</style>
