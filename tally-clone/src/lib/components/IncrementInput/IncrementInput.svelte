<script lang="ts">
  import { KEY_EVENT } from "@/utils/types";
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
      class="w-full p-1.5 text-gray-400 rounded-tl-full rounded-bl-full transition-colors select-none touch-none"
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
      class="w-full p-1.5 text-gray-400 rounded-tr-full rounded-br-full transition-colors select-none touch-none"
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
      class="flex justify-center items-center gap-6 mt-6"
    >
      <button
        class="flex justify-center items-center rounded-full h-14 w-14 bg-gray-200 hover:bg-gray-300 transition-colors"
        on:click|preventDefault={handleDecrementCounter}
        transition:fade
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15"
          />
        </svg>
      </button>

      <p class="text-2xl w-16 text-center" transition:fade>{value}</p>

      <button
        class="flex justify-center items-center rounded-full h-14 w-14 bg-gray-200 hover:bg-gray-300 transition-colors"
        on:click|preventDefault={handleIncrementCounter}
        transition:fade
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
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
